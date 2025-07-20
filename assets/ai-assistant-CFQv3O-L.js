import{a as l,w as j,p as t}from"./chunk-EF7DTUVF-DePYFLeH.js";import{s as $}from"./supabase-CvHotojb.js";import{L as N}from"./Layout-CFnhGHKA.js";import"./Navbar-BN-7-YAR.js";import"./Footer-CXkfyUfl.js";const _=()=>{const[v,p]=l.useState(!1),u=l.useCallback(async()=>{try{const{data:o,error:a}=await $.from("universities").select(`
          *,
          programs (*)
        `).order("rating",{ascending:!1}).limit(50);if(a)throw a;return o||[]}catch(o){return console.error("Помилка отримання університетів:",o),[]}},[]),g=l.useCallback((o,a)=>{const e=o.toLowerCase(),r={intent:"general",fields:[],budget:null,countries:[],programs:[],level:"bachelor"};return e.includes("комп'ютер")||e.includes("програмування")||e.includes("it")||e.includes("техніч")?(r.intent="computer_science",r.programs.push("Комп'ютерні науки","Програмна інженерія","Інформаційні технології")):e.includes("медицина")||e.includes("лікар")||e.includes("медичн")?(r.intent="medicine",r.programs.push("Медицина","Стоматологія","Фармація")):e.includes("бізнес")||e.includes("mba")||e.includes("менеджмент")||e.includes("економ")?(r.intent="business",r.programs.push("Бізнес-адміністрування","Менеджмент","Економіка","Маркетинг")):e.includes("право")||e.includes("юридичн")?(r.intent="law",r.programs.push("Право","Юриспруденція")):(e.includes("мистецтво")||e.includes("дизайн")||e.includes("архітектур"))&&(r.intent="arts",r.programs.push("Мистецтво","Дизайн","Архітектура")),e.includes("до 5000")||e.includes("до $5000")?r.budget=5e3:e.includes("до 10000")||e.includes("до $10000")?r.budget=1e4:e.includes("до 20000")||e.includes("до $20000")?r.budget=2e4:(e.includes("до 30000")||e.includes("до $30000"))&&(r.budget=3e4),["україна","польща","чехія","німеччина","франція","італія","іспанія","нідерланди","швеція","канада","австралія","сша","великобританія"].forEach(s=>{e.includes(s)&&r.countries.push(s)}),e.includes("магістр")||e.includes("master")?r.level="master":(e.includes("доктор")||e.includes("phd"))&&(r.level="phd"),r},[]),f=l.useCallback((o,a)=>{let e=o;return a.countries.length>0&&(e=e.filter(r=>a.countries.some(i=>{var s;return(s=r.country)==null?void 0:s.toLowerCase().includes(i)}))),a.budget&&(e=e.filter(r=>r.tuition_fee_min&&r.tuition_fee_min<=a.budget)),a.programs.length>0&&(e=e.filter(r=>{var i;return(i=r.programs)==null?void 0:i.some(s=>a.programs.some(d=>{var c;return(c=s.name)==null?void 0:c.toLowerCase().includes(d.toLowerCase())}))})),e.sort((r,i)=>(i.rating||0)-(r.rating||0)),e.slice(0,5)},[]),h=l.useCallback(async(o,a)=>null,[]),x=l.useCallback((o,a,e)=>{const r=f(a,e);let i="";switch(e.intent){case"computer_science":i=`💻 Чудовий вибір! Комп'ютерні науки - це дуже перспективна галузь.

Ось мої рекомендації для вас:

${r.map((s,d)=>{var c;return`
**${d+1}. ${s.name}**
📍 ${s.city}, ${s.country}
⭐ Рейтинг: ${s.rating||"Не вказано"}
💰 Вартість: ${s.tuition_fee_min?`від $${s.tuition_fee_min}`:"Не вказано"}
🎯 Програми: ${((c=s.programs)==null?void 0:c.map(n=>n.name).join(", "))||"Комп'ютерні науки"}
`}).join(`
`)}

**Чому ці університети?**
• Високі рейтинги в технічних дисциплінах
• Сучасні лабораторії та обладнання
• Зв'язки з IT-компаніями
• Стажування та кар'єрна підтримка

Хочете дізнатися більше про конкретний університет або порівняти програми?`;break;case"medicine":i=`🏥 Медицина - це благородна професія! 

Ось найкращі університети для медичної освіти:

${r.map((s,d)=>{var c;return`
**${d+1}. ${s.name}**
📍 ${s.city}, ${s.country}
⭐ Рейтинг: ${s.rating||"Не вказано"}
💰 Вартість: ${s.tuition_fee_min?`від $${s.tuition_fee_min}`:"Не вказано"}
🎯 Програми: ${((c=s.programs)==null?void 0:c.map(n=>n.name).join(", "))||"Медицина"}
`}).join(`
`)}

**Важливі аспекти медичної освіти:**
• Тривалість навчання: 6-8 років
• Практика в клініках
• Ліцензування після закінчення
• Можливості для спеціалізації

Чи цікавить вас конкретна спеціалізація або країна?`;break;case"business":i=`💼 Бізнес-освіта - це інвестиція в майбутнє!

Топ університети для бізнес-освіти:

${r.map((s,d)=>{var c;return`
**${d+1}. ${s.name}**
📍 ${s.city}, ${s.country}
⭐ Рейтинг: ${s.rating||"Не вказано"}
💰 Вартість: ${s.tuition_fee_min?`від $${s.tuition_fee_min}`:"Не вказано"}
🎯 Програми: ${((c=s.programs)==null?void 0:c.map(n=>n.name).join(", "))||"Бізнес-адміністрування"}
`}).join(`
`)}

**Переваги бізнес-освіти:**
• Мережа контактів (networking)
• Практичні кейси
• Стажування в компаніях
• Високі зарплати після закінчення

Який рівень освіти вас цікавить: бакалавр, магістр чи MBA?`;break;default:i=`🤔 Цікаве питання! Давайте розберемо детальніше.

${r.length>0?`
Ось кілька університетів, які можуть вас зацікавити:

${r.map((s,d)=>`
**${d+1}. ${s.name}**
📍 ${s.city}, ${s.country}
⭐ Рейтинг: ${s.rating||"Не вказано"}
💰 Вартість: ${s.tuition_fee_min?`від $${s.tuition_fee_min}`:"Не вказано"}
`).join(`
`)}
`:""}

Щоб надати вам найкращі рекомендації, мені потрібно знати:

**🎯 Ваші цілі:**
• Яка сфера вас цікавить?
• Який рівень освіти (бакалавр/магістр/доктор)?
• Плануєте працювати після навчання?

**💰 Фінансові можливості:**
• Який ваш бюджет?
• Чи потрібні стипендії?
• Готові працювати під час навчання?

**🌍 Географічні вподобання:**
• Які країни вас цікавлять?
• Важливий клімат?
• Мовні вимоги?

Розкажіть більше про ваші цілі та вподобання!`}return i},[f]);return{generateResponse:l.useCallback(async o=>{p(!0);try{const a=await u(),e=g(o,a),r={universities:a.slice(0,10),analysis:e,userQuery:o};let i=await h(o,r);return i||(i=x(o,a,e)),i}catch(a){return console.error("Помилка генерації відповіді:",a),"Вибачте, сталася помилка. Спробуйте ще раз або зверніться до підтримки."}finally{p(!1)}},[u,g,h,x]),isLoading:v}},L=j(function(){const[p,u]=l.useState([]),[g,f]=l.useState(""),[h,x]=l.useState(!1),b=l.useRef(null),{generateResponse:o,isLoading:a}=_(),e=()=>{var n;(n=b.current)==null||n.scrollIntoView({behavior:"smooth"})};l.useEffect(()=>{const n=localStorage.getItem("ai-assistant-history");if(n)try{const m=JSON.parse(n);u(m),x(m.length>0)}catch(m){console.error("Помилка завантаження історії:",m)}},[]),l.useEffect(()=>{p.length>0&&localStorage.setItem("ai-assistant-history",JSON.stringify(p))},[p]),l.useEffect(()=>{e()},[p]);const r=()=>{const n={id:Date.now(),type:"assistant",content:`🎓 Привіт! Я ваш AI помічник з вибору університету!

Я можу допомогти вам:
• Знайти ідеальний університет за вашими критеріями
• Порівняти різні програми навчання
• Розрахувати вартість освіти
• Порадити щодо вступних вимог
• Відповісти на будь-які питання про вищу освіту

Просто опишіть, що вас цікавить, і я надам персоналізовані рекомендації! 

Наприклад:
"Шукаю університет для вивчення комп'ютерних наук з бюджетом до $20,000"
"Які найкращі університети для MBA в Європі?"
"Допоможіть порівняти програми медицини в Канаді та Австралії"

Що вас цікавить? 🤔`,timestamp:new Date().toLocaleTimeString()};u([n]),x(!0)},i=async n=>{try{const m=await o(n),y={id:Date.now(),type:"assistant",content:m,timestamp:new Date().toLocaleTimeString()};u(w=>[...w,y])}catch(m){console.error("Помилка генерації відповіді:",m);const y={id:Date.now(),type:"assistant",content:"Вибачте, сталася помилка. Спробуйте ще раз або зверніться до підтримки.",timestamp:new Date().toLocaleTimeString()};u(w=>[...w,y])}},s=async()=>{if(!g.trim()||a)return;const n={id:Date.now(),type:"user",content:g,timestamp:new Date().toLocaleTimeString()};u(m=>[...m,n]),f(""),await i(g)},d=n=>{n.key==="Enter"&&!n.shiftKey&&(n.preventDefault(),s())},c=()=>{u([]),x(!1),localStorage.removeItem("ai-assistant-history")};return t.jsx(N,{children:t.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-blue-50 to-purple-50",children:[t.jsx("div",{className:"bg-white shadow-sm border-b",children:t.jsx("div",{className:"max-w-4xl mx-auto px-4 py-6",children:t.jsxs("div",{className:"flex items-center justify-between",children:[t.jsxs("div",{className:"text-center flex-1",children:[t.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-2",children:"🤖 AI Помічник"}),t.jsx("p",{className:"text-gray-600",children:"Персоналізовані рекомендації університетів від AI експерта"}),t.jsx("div",{className:"mt-2 text-xs text-gray-500",children:t.jsx("span",{className:"text-yellow-600",children:"⚠️ Використовується локальна логіка (додайте OpenAI API ключ для кращих результатів)"})})]}),h&&t.jsx("button",{onClick:c,className:"px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors",title:"Очистити історію розмов",children:"🗑️ Очистити"})]})})}),t.jsx("div",{className:"max-w-4xl mx-auto px-4 py-8",children:h?t.jsxs("div",{className:"bg-white rounded-xl shadow-sm overflow-hidden",children:[t.jsxs("div",{className:"h-96 overflow-y-auto p-6 space-y-4",children:[p.map(n=>t.jsx("div",{className:`flex ${n.type==="user"?"justify-end":"justify-start"}`,children:t.jsxs("div",{className:`max-w-3xl rounded-lg p-4 ${n.type==="user"?"bg-blue-500 text-white":"bg-gray-100 text-gray-900"}`,children:[t.jsx("div",{className:"whitespace-pre-wrap",children:n.content}),t.jsx("div",{className:`text-xs mt-2 ${n.type==="user"?"text-blue-100":"text-gray-500"}`,children:n.timestamp})]})},n.id)),a&&t.jsx("div",{className:"flex justify-start",children:t.jsx("div",{className:"bg-gray-100 rounded-lg p-4",children:t.jsxs("div",{className:"flex items-center space-x-2",children:[t.jsxs("div",{className:"flex space-x-1",children:[t.jsx("div",{className:"w-2 h-2 bg-gray-400 rounded-full animate-bounce"}),t.jsx("div",{className:"w-2 h-2 bg-gray-400 rounded-full animate-bounce",style:{animationDelay:"0.1s"}}),t.jsx("div",{className:"w-2 h-2 bg-gray-400 rounded-full animate-bounce",style:{animationDelay:"0.2s"}})]}),t.jsx("span",{className:"text-gray-600 text-sm",children:"AI думає..."})]})})}),t.jsx("div",{ref:b})]}),t.jsxs("div",{className:"border-t bg-gray-50 p-4",children:[t.jsxs("div",{className:"flex space-x-4",children:[t.jsx("div",{className:"flex-1",children:t.jsx("textarea",{value:g,onChange:n=>f(n.target.value),onKeyPress:d,placeholder:"Напишіть ваше повідомлення...",className:`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${a?"text-gray-500 bg-gray-100 cursor-not-allowed":"text-gray-900 bg-white"}`,rows:"2",disabled:a})}),t.jsx("button",{onClick:s,disabled:!g.trim()||a,className:`px-6 py-3 rounded-lg font-medium transition-colors ${g.trim()&&!a?"bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700":"bg-gray-200 text-gray-400 cursor-not-allowed"}`,children:"📤"})]}),t.jsx("div",{className:"mt-3 text-xs text-gray-500 text-center",children:"Натисніть Enter для відправки, Shift+Enter для нового рядка"})]})]}):t.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-8 text-center",children:[t.jsx("div",{className:"inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6",children:t.jsx("span",{className:"text-3xl",children:"🤖"})}),t.jsx("h2",{className:"text-2xl font-bold text-gray-900 mb-4",children:"Готові отримати персоналізовані рекомендації?"}),t.jsx("p",{className:"text-gray-600 mb-8 max-w-2xl mx-auto",children:"Наш AI помічник проаналізує ваші потреби та надасть найкращі рекомендації університетів. Просто почніть розмову та опишіть, що вас цікавить!"}),t.jsx("button",{onClick:r,className:"px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold text-lg",children:"🚀 Почати розмову з AI"})]})})]})})});export{L as default};
