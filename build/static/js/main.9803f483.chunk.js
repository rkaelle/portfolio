(this["webpackJsonpryan-kaelle"]=this["webpackJsonpryan-kaelle"]||[]).push([[0],{105:function(e){e.exports=JSON.parse('{"defaultSeo":{"title":"Ryan Kaelle | Personal Website","description":"Ryan Kaelle Media Portfolio Link Library and Publications built with React.js","canonical":"http://ryankaelle.dev","openGraph":{"title":"Ryan Kaelle | Personal Website","description":"Ryan Kaelle\'s Personal Website and Portfolio ","url":"https:/ryankaelle.dev","type":"profile","profile":{"firstName":"Ryan","lastName":"Kaelle","username":"rkaelle","gender":"male"},"images":[{"url":"https://i.ibb.co/5j8pyd9/square-ryan-kaelle-headshot.png","width":"360","height":"360","alt":"Ryan Kaelle"}]}},"socialProfileJsonLd":{"type":"Person","name":"Ryan Kaelle","url":"http://ryankaelle.dev","image":"https://i.ibb.co/5j8pyd9/square-ryan-kaelle-headshot.png","sameAs":["http://ryankaelle.dev","http://linkedin.com/in/ryan-kaelle","http://github.com/rkaelle"]}}')},169:function(e,t,a){e.exports=a(333)},174:function(e,t,a){},193:function(e,t,a){},317:function(e,t,a){},318:function(e,t,a){},319:function(e,t,a){},322:function(e,t,a){},323:function(e,t,a){},324:function(e,t,a){},325:function(e,t,a){},327:function(e,t,a){},328:function(e,t,a){},329:function(e,t,a){},333:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(22),i=a.n(c),l=(a(174),a(40)),o=a(103),s=a(105),d=a(8),u=a(9),m=a(6),h=a(10),p=a(11),b=a(359),f=a(69),v=a.n(f),g=a(158),y=a.n(g),E=a(36),k=a.n(E);a(193),a(78);function j(e){var t=r.a.useState(!1),a=Object(l.a)(t,2),n=a[0],c=a[1],i=r.a.useRef();return r.a.useEffect((function(){var e=new IntersectionObserver((function(e){e.forEach((function(e){e.isIntersecting&&c(e.isIntersecting)}))}));return e.observe(i.current),function(){return e.unobserve(i.current)}}),[]),r.a.createElement("div",{className:"fade-in-section ".concat(n?"is-visible":""),style:{transitionDelay:"".concat(e.delay)},ref:i},e.children)}var S,w=window.innerWidth<600,O=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(){var e;return Object(d.a)(this,a),(e=t.call(this)).state={expanded:!0,activeKey:"1"},e.handleSelect=e.handleSelect.bind(Object(m.a)(e)),e}return Object(u.a)(a,[{key:"handleSelect",value:function(e){this.setState({activeKey:e})}},{key:"render",value:function(){var e=this.state.expanded,t=[r.a.createElement("a",{href:"#header"},"/home"),r.a.createElement("a",{href:"#about"},"/about"),r.a.createElement("a",{href:"#experience"},"/experience"),r.a.createElement("a",{href:"#projects"},"/creations & projects")];return r.a.createElement("div",{className:"sidebar-nav"},!w&&r.a.createElement(b.a,{expanded:e,defaultOpenKeys:["3","4"],activeKey:this.state.activeKey,onSelect:this.handleSelect,appearance:"subtle"},r.a.createElement(b.a.Body,null,r.a.createElement("div",{className:"sidebar-links"},t.map((function(e,t){return r.a.createElement(j,{delay:"".concat(t+1,"00ms")},r.a.createElement("div",null,e))}))))),r.a.createElement("div",{className:"sidebar-logos",href:"/"},r.a.createElement("a",{href:"mailto:rkaelle2@gmail.com"},r.a.createElement(v.a,{style:{fontSize:20}})),r.a.createElement("a",{href:"https://github.com/rkaelle"},r.a.createElement(k.a,{style:{fontSize:19}})),r.a.createElement("a",{href:"https://www.linkedin.com/in/ryan-kaelle/"},r.a.createElement(y.a,{style:{fontSize:21}}))))}}]),a}(r.a.Component),N=(a(317),a(107)),C=a.n(N),P=a(162),x=(a(318),function(e){e.setup=function(){e.createCanvas(400,400,"transparent"),S=e.PI/4,e.stroke(255)},e.draw=function(){e.background(51),e.clear(),e.translate(200,e.height),S=e.map(e.sin(.01*e.frameCount),-1,1,e.PI/1.45,e.PI/16),function t(a){e.line(0,0,0,-a),e.translate(0,-a),a>4&&(e.push(),e.rotate(S),t(.67*a),e.pop(),e.push(),e.rotate(-S),t(.67*a),e.pop())}(100)}}),R=function(){return r.a.createElement("div",{id:"fractal-tree"},r.a.createElement(P.a,{sketch:x}))},L=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(){var e;return Object(d.a)(this,a),(e=t.call(this)).state={expanded:!0,activeKey:"1",visible:!0},e.handleSelect=e.handleSelect.bind(Object(m.a)(e)),e}return Object(u.a)(a,[{key:"handleSelect",value:function(e){this.setState({activeKey:e})}},{key:"render",value:function(){return r.a.createElement("div",{id:"intro"},r.a.createElement(R,null),r.a.createElement(C.a,{cursor:{hideWhenDone:!0}},r.a.createElement("span",{className:"intro-title"},"hi, i'm ",r.a.createElement("span",{className:"intro-name"},"ryan"),r.a.createElement(C.a.Backspace,{count:4,delay:1e3}),r.a.createElement("span",{className:"intro-name"},"ryan kaelle"))),r.a.createElement(j,null,r.a.createElement("div",{className:"intro-subtitle"},"Always learning, both in and out of school"),r.a.createElement("div",{className:"intro-desc"},"This site serves as a hub to showcase my past and current endeavors, including my projects (whether it be hardware or software), background, statistics, publications, and more."),r.a.createElement("a",{href:"mailto:rkaelle2@gmail.com",className:"intro-contact"},r.a.createElement(v.a,null),"  Contact me")))}}]),a}(r.a.Component),A=(a(319),a(160)),K=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(){var e;return Object(d.a)(this,a),(e=t.call(this)).state={expanded:!1,activeKey:"1",visible:!0},e.handleSelect=e.handleSelect.bind(Object(m.a)(e)),e}return Object(u.a)(a,[{key:"handleSelect",value:function(e){this.setState({activeKey:e})}},{key:"render",value:function(){return r.a.createElement("div",{id:"header"},r.a.createElement("span",{className:"header-blinker"},"~ /",r.a.createElement(A.a,{sequence:[""]})))}}]),a}(r.a.Component),I=a(163),T=a(357),B=a(361),D=a(358),M=a(356),F=a(360),J=window.innerWidth<600;function W(e){var t=e.children,a=e.value,n=e.index,c=Object(I.a)(e,["children","value","index"]);return J?r.a.createElement("div",Object.assign({role:"tabpanel",hidden:a!==n,id:"full-width-tabpanel-".concat(n),"aria-labelledby":"full-width-tab-".concat(n)},c),a===n&&r.a.createElement(F.a,{p:3},r.a.createElement(M.a,null,t))):r.a.createElement("div",Object.assign({role:"tabpanel",hidden:a!==n,id:"vertical-tabpanel"},c),a===n&&r.a.createElement(F.a,{p:3},r.a.createElement(M.a,null,t)))}var z=Object(T.a)((function(e){return{root:{flexGrow:1,backgroundColor:"theme.palette.background.paper",display:"flex",height:300},tabs:{borderRight:"1px solid ".concat(e.palette.divider)}}})),H=function(){var e=z(),t=r.a.useState(0),a=Object(l.a)(t,2),n=a[0],c=a[1],i={"Power Engineering Company":{jobTitle:"Intern",duration:"May 2021 - August 2021",desc:["Collaborated with executives; Ordered $25k of site materials; Attained boating license; Learned from fellow engineers by collaborating on project concepts; ","Assessed structural integrity of projects; Observed client meetings; Learned industry intricacies; Labored on job sites; Learned Computer Aided Design (CAD).","Power Engineering Construction Company builds marine construction and civil engineering projects in the Bay Area. The corporation conducts industrial construction projects such as the San Francisco Exploratorium Museum, SF Ferry Terminal and Pier 15."]},"Community Emergency Response Team (CERT)":{jobTitle:"Radio Specialized Volunteer",duration:"MAY 2021 - Present",desc:["CERT was my Eagle Scout project sponsor; When possible, assist as radio manager; ","Combine amateur radio & computer science skills to program 20 emergency radios; ","Perform monthly system updates; Ran nets - on-the-air gatherings of amateur radio operators; Maintain records of station; Assisted operations of the federally-licensed repeater and sub-unit."]},"Miramonte Robotics Team":{jobTitle:"Lead Systems Engineer",duration:"Jan 2022 - April 2022",desc:["As the Lead Systems Engineer I managed a team of 6 beginning/advanced Club members. Organized Club meetings; Co-managed $10k budget.","I taught peers Java, Python, and electrical engineering skills; Top 30 at FIRST Robotics regionals; Built the robot's hardware components (circuits/sensors/motors); Collaborated with other team leaders; ","Relevant technologies/tools used: Java, Servos, Infrared, RF","Trained a team of two inexperienced peers to manage the 3D printing setup; Manage the eight 3D printers & CNC for all students to use for free; "]},StockX:{jobTitle:"Special Project Intern",duration:"June 2022 - JULY 2022",desc:["4-week paid internship. I worked on a special finance project; Created Sarbanes-Oxley flowcharts; ","Experienced finance work environment; Collaborated with executives; Learned about supply chain management, product development, and warehouse organization; Experienced the finance and management side of a company."]}};return r.a.createElement("div",{className:e.root},r.a.createElement(B.a,{orientation:J?null:"vertical",variant:J?"fullWidth":"scrollable",value:n,onChange:function(e,t){c(t)},className:e.tabs},Object.keys(i).map((function(e,t){return r.a.createElement(D.a,Object.assign({label:J?"0".concat(t,"."):e},(a=t,J?{id:"full-width-tab-".concat(a),"aria-controls":"full-width-tabpanel-".concat(a)}:{id:"vertical-tab-".concat(a)})));var a}))),Object.keys(i).map((function(e,t){return r.a.createElement(W,{value:n,index:t},r.a.createElement("span",{className:"joblist-job-title"},i[e].jobTitle+" "),r.a.createElement("span",{className:"joblist-job-company"},e),r.a.createElement("div",{className:"joblist-duration"},i[e].duration),r.a.createElement("ul",{className:"job-description"},i[e].desc.map((function(e,t){return r.a.createElement(j,{delay:"".concat(t+1,"00ms")},r.a.createElement("li",{key:t},e))}))))})))},q=(a(322),function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(){var e;return Object(d.a)(this,a),(e=t.call(this)).state={expanded:!0,activeKey:"1"},e.handleSelect=e.handleSelect.bind(Object(m.a)(e)),e}return Object(u.a)(a,[{key:"handleSelect",value:function(e){this.setState({activeKey:e})}},{key:"render",value:function(){return r.a.createElement("div",{id:"experience"},r.a.createElement(j,null,r.a.createElement("div",{className:"section-header "},r.a.createElement("span",{className:"section-title"},"/ experience")),r.a.createElement(H,null)))}}]),a}(r.a.Component)),U=(a(323),a(50)),G=a.n(U),Y=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(){var e;return Object(d.a)(this,a),(e=t.call(this)).state={expanded:!0,activeKey:"1"},e.handleSelect=e.handleSelect.bind(Object(m.a)(e)),e}return Object(u.a)(a,[{key:"handleSelect",value:function(e){this.setState({activeKey:e})}},{key:"render",value:function(){return r.a.createElement("span",{className:"external-stats"},this.props.openLink&&r.a.createElement("a",{className:"open-icon",href:this.props.openLink},r.a.createElement(G.a,{style:{fontSize:25,color:"var(--lightest-slate)"}})))}}]),a}(r.a.Component),_=(r.a.Component,a(324),function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(){var e;return Object(d.a)(this,a),(e=t.call(this)).state={expanded:!0,activeKey:"1"},e.handleSelect=e.handleSelect.bind(Object(m.a)(e)),e}return Object(u.a)(a,[{key:"handleSelect",value:function(e){this.setState({activeKey:e})}},{key:"render",value:function(){var e=r.a.createElement("p",null,"I am currently a Senior at ",r.a.createElement("a",{href:"https://www.acalanes.k12.ca.us/miramonte"}," Miramonte High School"),", looking to work in electrical engineering, fintech, and data science. At the same time, I am undertaking outside ",r.a.createElement("a",{href:"https://www.udemy.com/user/ryan-kaelle-2/"},"online courses ")," to expand my skills."),t=r.a.createElement("p",null,"Outside of work, I'm interested in drones, cars, the outdoors, and sneakers. And I'm always interested in learning more, whether it be through reading, podcasts, or hands-on projects.");return r.a.createElement("div",{id:"about"},r.a.createElement(j,null,r.a.createElement("div",{className:"section-header "},r.a.createElement("span",{className:"section-title"},"/ about me")),r.a.createElement("div",{className:"about-content"},r.a.createElement("div",{className:"about-description"},[e],"Here are some technologies I have been working with:",r.a.createElement("ul",{className:"tech-stack"},["Python","3D Printing","Fintech","RF Devices","Linux","Crypto"].map((function(e,t){return r.a.createElement(j,{delay:"".concat(t+1,"00ms")},r.a.createElement("li",null,e))}))),[t]),r.a.createElement("div",{className:"ryan_portrait"},r.a.createElement("img",{class:"image_on",src:"/assets/porsche.png",alt:"Ryan + Porsche"}),r.a.createElement("img",{class:"image_off",src:"/assets/scouts_headshot.png",alt:"Scouts"})))))}}]),a}(r.a.Component)),V=(a(325),a(102)),$=a.n(V),X=(a(326),a(74)),Q=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(){var e;return Object(d.a)(this,a),(e=t.call(this)).state={expanded:!0,activeKey:"1"},e.handleSelect=e.handleSelect.bind(Object(m.a)(e)),e}return Object(u.a)(a,[{key:"handleSelect",value:function(e){this.setState({activeKey:e})}},{key:"render",value:function(){return r.a.createElement("span",{className:"external-links"},r.a.createElement("a",{className:"github-icon",href:this.props.githubLink},r.a.createElement(k.a,{style:{fontSize:20,color:"var(--lightest-slate)"}})),this.props.openLink&&r.a.createElement("a",{className:"open-icon",href:this.props.openLink},r.a.createElement(G.a,{style:{fontSize:25,color:"var(--lightest-slate)"}})))}}]),a}(r.a.Component),Z=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(){var e;return Object(d.a)(this,a),(e=t.call(this)).state={expanded:!0,activeKey:"1"},e.handleSelect=e.handleSelect.bind(Object(m.a)(e)),e}return Object(u.a)(a,[{key:"handleSelect",value:function(e){this.setState({activeKey:e})}},{key:"render",value:function(){var e={"AI chessboard":{title:"AI magnetic chessboard",desc:"The automated chess board is composed of an XY table with an electromagnet on the moving trolley. ",techStack:"C#, Arduino, 3D Printing, Micro Max chess",link:"https://github.com/slakh96/no-mans-land",open:"",image:"/assets/chessboard.png"},"2bit cpu":{title:"2-Bit CPU",desc:"2 bit ALU circuit that uses inverters, AND, OR gate, Ex-or gate and a multiplexer. It takes two input bits.",techStack:"Chips, Wiring",link:"",open:"https://www.cs.uregina.ca/Links/class-info/301/cpu1bit/lectureLS.html",image:"/assets/cpu.jpg"},"Ham radio station":{title:"Amateur Radio Station",desc:"G90 High Frequency Radio setup + Yaesu FT70 handheld. Able to reach 2500mi+ using dipole antenna.",techStack:"RF, soldering, wiring",link:"",open:"",image:"/assets/radio.jpg"},"FPV drone":{title:"FPV drone(s)",desc:"Two fpv racing drones capable of speeds up to 85mph. Built piece by piece.",techStack:"Soldering, wiring, Linux CLI",link:"",open:"",image:"/assets/drones.jpg"},"Clustered Raspberry ":{title:"Clustered Raspberry Pi",desc:"include NAS file storage, personal homelab, and micro supercomputer",techStack:"Raspian, Clustering, Microcomputers",link:"",open:"",image:"/assets/cluster.jpeg"}},t={"RK coin":{desc:"A derivation of the parent coins Bitcoin and Litecoin but with a twist.",techStack:"C++, Python, Solidity, Blockchain",link:"https://github.com/rkaelle/rk-coin",open:""},"RK chat":{desc:"A Python (Flask) based web app intended to be hosted on a laptop.",techStack:"Python, JavaScript, CSS, HTML, ",link:"https://github.com/rkaelle/rk-chatroom",open:""},"Algorithmic Trading":{desc:"A series of programs built from a .",techStack:"Python, QuantConnect, Pandas, Numpy, Matplotlib ",link:"https://github.com/rkaelle/algo-trading-strategies",open:"https://www.udemy.com/course/python-for-finance-and-algorithmic-trading-with-quantconnect/"},"This site! (My Portfolio)":{desc:"Built using ReactJS. This site serves as a place to show off my current updates",techStack:"Javascript, Node.js, Natural NLP, Telegram API",link:"https://github.com/rkaelle/portfolio",open:"https://ryankaelle.dev"},"Raspberry Pi flight tracker (ADS-B station)":{desc:"Using intercepted Software Defined Raadio waves, I am able to track planes up to 200 miles away.",techStack:" RTL-SDR",link:"",open:""},"Built an autonomous quadcopter with ArduPilot control software":{desc:"Able to respond accordingly given GPS input. Uses camera, gyroscope, and accelerometer to determine best route.",techStack:"ArduPilot, Drones, CLI",link:"",open:""}};return r.a.createElement("div",{id:"projects"},r.a.createElement("div",{className:"section-header "},r.a.createElement("span",{className:"section-title"},"/ creations")),r.a.createElement(X.a,null,Object.keys(e).map((function(t,a){return r.a.createElement(X.a.Item,null,r.a.createElement("img",{className:"d-block w-100",src:e[t].image,alt:t}),r.a.createElement("div",{className:"caption-bg"},r.a.createElement(X.a.Caption,null,r.a.createElement("h3",null,e[t].title),r.a.createElement("p",null,e[t].desc,r.a.createElement("p",{className:"techStack"},e[t].techStack)),r.a.createElement(Q,{githubLink:e[t].link,openLink:e[t].open}))))}))),r.a.createElement("div",{className:"project-container"},r.a.createElement("ul",{className:"projects-grid"},Object.keys(t).map((function(e,a){return r.a.createElement(j,{delay:"".concat(a+1,"00ms")},r.a.createElement("li",{className:"projects-card"},r.a.createElement("div",{className:"card-header"},r.a.createElement("div",{className:"folder-icon"},r.a.createElement($.a,{style:{fontSize:35}})),r.a.createElement(Q,{githubLink:t[e].link,openLink:t[e].open})),r.a.createElement("div",{className:"card-title"},e),r.a.createElement("div",{className:"card-desc"},t[e].desc),r.a.createElement("div",{className:"card-tech"},t[e].techStack)))})))))}}]),a}(r.a.Component),ee=(a(327),function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(){var e;return Object(d.a)(this,a),(e=t.call(this)).state={expanded:!0,activeKey:"1"},e.handleSelect=e.handleSelect.bind(Object(m.a)(e)),e}return Object(u.a)(a,[{key:"handleSelect",value:function(e){this.setState({activeKey:e})}},{key:"render",value:function(){return r.a.createElement(j,null,r.a.createElement("div",{id:"credits"},r.a.createElement("div",{className:"ending-credits"},r.a.createElement("div",null,"Built and designed by Ryan Kaelle. "))))}}]),a}(r.a.Component));a(328),a(329),a(330);var te=function(){var e=Object(n.useState)(0),t=Object(l.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)((function(){var e=function(){var e=document.documentElement.scrollTop,t=document.documentElement.scrollHeight-document.documentElement.clientHeight,a="".concat(e/t);c(a)};return window.addEventListener("scroll",e),function(){return window.removeEventListener("scroll",e)}})),r.a.createElement("div",{className:"App"},r.a.createElement("div",{id:"content"},r.a.createElement(o.a,s.defaultSeo),r.a.createElement(o.b,s.socialProfileJsonLd),r.a.createElement(K,null),r.a.createElement(L,null),r.a.createElement(_,null),r.a.createElement(q,null),r.a.createElement(Z,null),r.a.createElement(ee,null)),r.a.createElement("div",{id:"progressBarContainer"},r.a.createElement("div",{id:"progressBar",style:{transform:"scale(".concat(a,", 1)")}})),r.a.createElement(O,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(331);var ae=a(161);i.a.render(r.a.createElement(ae.a,null,r.a.createElement(te,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[169,1,2]]]);
//# sourceMappingURL=main.9803f483.chunk.js.map