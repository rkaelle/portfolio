'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeftIcon, CommandLineIcon, CloudArrowUpIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import TypewriterText from '@/app/components/TypewriterText';
import { db, storage } from '@/app/lib/firebase';
import { collection, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const EYE_COLORS = ['Blue', 'Brown', 'Green', 'Hazel', 'Gray', 'Amber', 'Other'];
const HAIR_COLORS = ['Black', 'Brown (Dark)', 'Brown (Light)', 'Blonde', 'Red', 'Auburn', 'Gray', 'White', 'Bald', 'Other'];
const GENDERS = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY','DC',
];

interface FormData {
  contactType: 'snapchat' | 'phone' | 'telegram';
  contactValue: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  eyeColor: string;
  hairColor: string;
  dob: string;
  heightFt: string;
  heightIn: string;
  weight: string;
  state: string;
  street: string;
  city: string;
  zip: string;
  dlNumber: string;
  dlIssueDate: string;
  organDonor: boolean;
  moreThanTwoJumps: string;
}

const INITIAL: FormData = {
  contactType: 'phone',
  contactValue: '',
  firstName: '',
  middleName: '',
  lastName: '',
  gender: '',
  eyeColor: '',
  hairColor: '',
  dob: '',
  heightFt: '',
  heightIn: '',
  weight: '',
  state: '',
  street: '',
  city: '',
  zip: '',
  dlNumber: '',
  dlIssueDate: '',
  organDonor: false,
  moreThanTwoJumps: '',
};

const inputClass =
  'w-full bg-nord-polar-2/80 border border-neon-blue/20 rounded-sm px-3 py-2 text-cyber-white font-tech text-sm focus:outline-none focus:border-neon-blue/60 placeholder:text-cyber-white/20 transition-colors';
const selectClass =
  'w-full bg-nord-polar-2/80 border border-neon-blue/20 rounded-sm px-3 py-2 text-cyber-white font-tech text-sm focus:outline-none focus:border-neon-blue/60 transition-colors appearance-none cursor-pointer';
const labelClass = 'block font-tech text-xs text-cyber-white/60 mb-1 tracking-wide uppercase';
const requiredStar = <span className="text-nord-aurora-1 ml-0.5">*</span>;

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-cyber text-matrix-green border-b border-matrix-green/20 pb-2 mb-5">
      {children}
    </h2>
  );
}

function FileUpload({
  label,
  required,
  hint,
  onChange,
  file,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  onChange: (f: File | null) => void;
  file: File | null;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const dropped = e.dataTransfer.files[0] ?? null;
      onChange(dropped);
    },
    [onChange],
  );

  return (
    <div>
      <label className={labelClass}>
        {label}
        {required && requiredStar}
      </label>
      {hint && (
        <p className="text-cyber-white/40 font-tech text-xs mb-2 leading-relaxed whitespace-pre-line">{hint}</p>
      )}
      <div
        className={`border-2 border-dashed rounded-sm p-6 text-center cursor-pointer transition-colors ${
          file
            ? 'border-matrix-green/60 bg-matrix-green/5'
            : 'border-neon-blue/20 hover:border-neon-blue/50 bg-nord-polar-2/40'
        }`}
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {file ? (
          <div className="flex items-center justify-center gap-2 text-matrix-green font-tech text-sm">
            <CheckCircleIcon className="w-5 h-5" />
            <span>{file.name}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              className="text-nord-aurora-1/70 hover:text-nord-aurora-1 ml-2 text-xs"
            >
              [remove]
            </button>
          </div>
        ) : (
          <div className="space-y-2 text-cyber-white/40 font-tech text-sm">
            <CloudArrowUpIcon className="w-8 h-8 mx-auto text-neon-blue/40" />
            <p>Drag & drop or click to upload</p>
            <p className="text-xs">PNG, JPG, PDF accepted</p>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}

export default function SkyDivingForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [headshot, setHeadshot] = useState<File | null>(null);
  const [signature, setSignature] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [submissionId, setSubmissionId] = useState('');

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox'
      ? (e.target as HTMLInputElement).checked
      : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (): string => {
    if (!form.contactValue.trim()) return 'Contact info is required.';
    if (!form.firstName.trim()) return 'First name is required.';
    if (!form.lastName.trim()) return 'Last name is required.';
    if (!form.gender) return 'Gender is required.';
    if (!form.eyeColor) return 'Eye color is required.';
    if (!form.hairColor) return 'Hair color is required.';
    if (!form.dob) return 'Date of birth is required.';
    if (!form.heightFt) return 'Height is required.';
    if (!form.weight) return 'Weight is required.';
    if (!headshot) return 'Headshot photo is required.';
    if (!signature) return 'Signature upload is required.';
    return '';
  };

  const uploadFile = async (file: File, path: string): Promise<string> => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setSubmitting(true);
    try {
      const docRef = await addDoc(collection(db, 'skydiving_bookings'), {
        contact: { type: form.contactType, value: form.contactValue },
        name: {
          first: form.firstName,
          middle: form.middleName,
          last: form.lastName,
        },
        gender: form.gender,
        eyeColor: form.eyeColor,
        hairColor: form.hairColor,
        dob: form.dob,
        height: `${form.heightFt}-${form.heightIn || '0'}`,
        weight: form.weight,
        address: {
          state: form.state,
          street: form.street,
          city: form.city,
          zip: form.zip,
        },
        driversLicense: {
          number: form.dlNumber,
          issueDate: form.dlIssueDate,
        },
        organDonor: form.organDonor,
        moreThanTwoJumps: form.moreThanTwoJumps || null,
        paid: false,
        submittedAt: serverTimestamp(),
      });

      const id = docRef.id;
      const [headshotUrl, signatureUrl] = await Promise.all([
        uploadFile(headshot!, `skydiving/${id}/headshot`),
        uploadFile(signature!, `skydiving/${id}/signature`),
      ]);

      await updateDoc(docRef, { headshotUrl, signatureUrl });

      setSubmissionId(id);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setError('Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#111319] text-cyber-white">
        <div className="fixed top-0 left-0 w-full h-12 bg-tech-gray/80 backdrop-blur-sm border-b border-neon-blue/20 flex items-center px-4 font-tech z-50">
          <div className="flex items-center gap-2 text-neon-blue -ml-1">
            <CommandLineIcon className="w-4 h-4" />
            <span className="text-matrix-green">~</span>
            <span>/</span>
            <span>upload/confirmation</span>
          </div>
        </div>

        <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,rgba(76,86,106,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(76,86,106,0.15)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_60%,transparent_100%)]" />

        <main className="flex min-h-screen items-center justify-center px-4 pt-16 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg w-full space-y-6"
          >
            <div className="border border-matrix-green/30 bg-matrix-green/5 rounded-sm p-8 text-center space-y-4">
              <CheckCircleIcon className="w-16 h-16 text-matrix-green mx-auto" />
              <h1 className="text-3xl font-cyber text-matrix-green">Booking Received</h1>
              <p className="text-cyber-white/70 font-tech text-sm">
                Your information has been submitted successfully.
              </p>
              <p className="text-cyber-white/40 font-tech text-xs">
                Ref: <span className="text-neon-blue">{submissionId}</span>
              </p>
            </div>

            <div className="border border-neon-blue/20 bg-nord-polar-2/50 rounded-sm p-6 space-y-4">
              <h2 className="text-lg font-cyber text-neon-blue">Payment — $80.00</h2>
              <p className="text-cyber-white/70 font-tech text-sm leading-relaxed">
                I&apos;ll reach out to you via your provided contact info to arrange payment before finalizing your booking.
              </p>
              <div className="border-t border-neon-blue/10 pt-4 space-y-2">
                <p className="font-tech text-xs text-cyber-white/40 uppercase tracking-wide">What to expect</p>
                <ul className="space-y-1 font-tech text-sm text-cyber-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-matrix-green">›</span>
                    You&apos;ll receive a message to your provided contact ({form.contactType})
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-matrix-green">›</span>
                    Payment of <span className="text-neon-blue font-semibold">$80</span> will be collected before the jump
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-matrix-green">›</span>
                    Booking confirmed once payment is received
                  </li>
                </ul>
              </div>
            </div>

            <Link
              href="/"
              className="flex items-center justify-center gap-2 py-3 px-6 border border-neon-blue/30 bg-neon-blue/5 rounded-sm text-neon-blue font-tech text-sm hover:bg-neon-blue/10 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Return Home
            </Link>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111319] text-cyber-white">
      {/* Terminal Header */}
      <div className="fixed top-0 left-0 w-full h-12 bg-tech-gray/80 backdrop-blur-sm border-b border-neon-blue/20 flex items-center px-4 font-tech z-50">
        <div className="flex items-center gap-2 text-neon-blue -ml-1">
          <CommandLineIcon className="w-4 h-4" />
          <span className="text-matrix-green">~</span>
          <span>/</span>
          <TypewriterText text="upload/booking" prefix="" />
        </div>
      </div>

      <Link
        href="/"
        className="fixed top-16 left-8 py-2 px-4 bg-nord-polar-2/80 border border-neon-blue/30 rounded-sm text-neon-blue font-tech flex items-center gap-2 hover:bg-neon-blue/20 transition-colors z-50 text-sm"
      >
        <ArrowLeftIcon className="w-4 h-4" /> Return Home
      </Link>

      {/* Background Grid */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,rgba(76,86,106,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(76,86,106,0.15)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_60%,transparent_100%)]" />

      <main className="relative pt-28 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Page Title */}
            <div className="space-y-1">
              <p className="text-matrix-green font-tech text-xs tracking-[0.2em] uppercase">
                &lt; upload.booking.init() /&gt;
              </p>
              <h1 className="text-4xl font-cyber text-cyber-white">Identification Form</h1>
              <p className="text-cyber-white/50 font-tech text-sm">
                Fill out the form below. Payment of <span className="text-neon-blue">$80</span> will be arranged after submission.
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border border-nord-aurora-1/40 bg-nord-aurora-1/10 rounded-sm px-4 py-3 font-tech text-sm text-nord-aurora-1"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">

              {/* ── CONTACT ── */}
              <section className="space-y-4">
                <SectionHeader>/ Contact Info</SectionHeader>
                <p className="text-cyber-white/40 font-tech text-xs leading-relaxed">
                  I&apos;ll reach out to you via this contact to arrange payment.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Contact Method {requiredStar}</label>
                    <select className={selectClass} value={form.contactType} onChange={set('contactType')}>
                      <option value="phone">Phone Number</option>
                      <option value="snapchat">Snapchat</option>
                      <option value="telegram">Telegram</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>
                      {form.contactType === 'phone' ? 'Phone Number' : form.contactType === 'snapchat' ? 'Snapchat Username' : 'Telegram @username'} {requiredStar}
                    </label>
                    <input
                      type={form.contactType === 'phone' ? 'tel' : 'text'}
                      className={inputClass}
                      placeholder={form.contactType === 'phone' ? '+1 (555) 000-0000' : form.contactType === 'snapchat' ? 'your.username' : '@username'}
                      value={form.contactValue}
                      onChange={set('contactValue')}
                    />
                  </div>
                </div>
              </section>

              {/* ── PERSONAL INFO ── */}
              <section className="space-y-4">
                <SectionHeader>/ Personal Information</SectionHeader>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>First Name {requiredStar}</label>
                    <input className={inputClass} type="text" placeholder="First" value={form.firstName} onChange={set('firstName')} />
                  </div>
                  <div>
                    <label className={labelClass}>Middle Name</label>
                    <input className={inputClass} type="text" placeholder="Middle" value={form.middleName} onChange={set('middleName')} />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name {requiredStar}</label>
                    <input className={inputClass} type="text" placeholder="Last" value={form.lastName} onChange={set('lastName')} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Gender {requiredStar}</label>
                    <select className={selectClass} value={form.gender} onChange={set('gender')}>
                      <option value="">Select...</option>
                      {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Eye Color {requiredStar}</label>
                    <select className={selectClass} value={form.eyeColor} onChange={set('eyeColor')}>
                      <option value="">Select...</option>
                      {EYE_COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Hair Color {requiredStar}</label>
                    <select className={selectClass} value={form.hairColor} onChange={set('hairColor')}>
                      <option value="">Select...</option>
                      {HAIR_COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Date of Birth {requiredStar}</label>
                    <input className={inputClass} type="date" value={form.dob} onChange={set('dob')} />
                  </div>
                  <div>
                    <label className={labelClass}>Height {requiredStar}</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          className={inputClass}
                          type="number"
                          min="3" max="8"
                          placeholder="ft"
                          value={form.heightFt}
                          onChange={set('heightFt')}
                        />
                      </div>
                      <div className="relative flex-1">
                        <input
                          className={inputClass}
                          type="number"
                          min="0" max="11"
                          placeholder="in"
                          value={form.heightIn}
                          onChange={set('heightIn')}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Weight (lbs) {requiredStar}</label>
                    <input
                      className={inputClass}
                      type="number"
                      min="1"
                      placeholder="lbs"
                      value={form.weight}
                      onChange={set('weight')}
                    />
                  </div>
                </div>
              </section>

              {/* ── ADDRESS / ID ── */}
              <section className="space-y-4">
                <SectionHeader>/ ID &amp; Address</SectionHeader>
                <div className="border border-neon-blue/10 bg-neon-blue/5 rounded-sm px-4 py-3 font-tech text-xs text-cyber-white/50 leading-relaxed">
                  All fields in this section are optional. If left blank, a random valid address in your selected state will be used. If you provide custom information, ensure it is accurate and free of typos.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Street Address</label>
                    <input className={inputClass} type="text" placeholder="123 Main St" value={form.street} onChange={set('street')} />
                  </div>
                  <div>
                    <label className={labelClass}>State</label>
                    <select className={selectClass} value={form.state} onChange={set('state')}>
                      <option value="">Select...</option>
                      {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>City</label>
                    <input className={inputClass} type="text" placeholder="City" value={form.city} onChange={set('city')} />
                  </div>
                  <div>
                    <label className={labelClass}>Zip Code</label>
                    <input className={inputClass} type="text" placeholder="00000" maxLength={10} value={form.zip} onChange={set('zip')} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Driver&apos;s License No.</label>
                    <input className={inputClass} type="text" placeholder="License number" value={form.dlNumber} onChange={set('dlNumber')} />
                  </div>
                  <div>
                    <label className={labelClass}>Issue Date (mm/dd/yyyy)</label>
                    <input className={inputClass} type="text" placeholder="MM/DD/YYYY" value={form.dlIssueDate} onChange={set('dlIssueDate')} />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, organDonor: !prev.organDonor }))}
                    className={`w-10 h-6 rounded-full border transition-colors flex items-center ${
                      form.organDonor
                        ? 'bg-matrix-green border-matrix-green justify-end'
                        : 'bg-nord-polar-2/80 border-neon-blue/20 justify-start'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-cyber-white mx-1 block" />
                  </button>
                  <span className="font-tech text-sm text-cyber-white/70">
                    Organ Donor — <span className={form.organDonor ? 'text-matrix-green' : 'text-cyber-white/40'}>{form.organDonor ? 'YES' : 'NO (default)'}</span>
                  </span>
                </div>
              </section>

              {/* ── ADDITIONAL ── */}
              <section className="space-y-4">
                <SectionHeader>/ Additional</SectionHeader>
                <div>
                  <label className={labelClass}>Do you want more than two IDs?</label>
                  <select className={selectClass} value={form.moreThanTwoJumps} onChange={set('moreThanTwoJumps')}>
                    <option value="">No preference</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </section>

              {/* ── UPLOADS ── */}
              <section className="space-y-6">
                <SectionHeader>/ Photo Uploads</SectionHeader>

                <FileUpload
                  label="Headshot"
                  required
                  hint={`If you do not have one, visit a local post office for a passport photo.\nPlease ensure this is a valid, clear photo.`}
                  file={headshot}
                  onChange={setHeadshot}
                />

                <FileUpload
                  label="Signature"
                  required
                  hint={`Options:\n1. Write on an iPad and upload\n2. Write on a blank sheet of paper, photograph, and upload`}
                  file={signature}
                  onChange={setSignature}
                />
              </section>

              {/* ── SUBMIT ── */}
              <div className="pt-4 border-t border-neon-blue/10 space-y-3">
                <p className="font-tech text-xs text-cyber-white/40">
                  By submitting you agree to be contacted for payment of <span className="text-neon-blue">$80.00</span>.
                </p>
                <motion.button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-neon-blue/10 border border-neon-blue/40 rounded-sm text-neon-blue font-tech text-sm tracking-wide hover:bg-neon-blue/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: submitting ? 1 : 1.01 }}
                  whileTap={{ scale: submitting ? 1 : 0.99 }}
                >
                  {submitting ? 'Submitting...' : 'Submit Booking →'}
                </motion.button>
              </div>

            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
