import { useState, useEffect } from "react";

const C = {
  negro:"#000000",pizarra:"#394953",blanco:"#ffffff",acento:"#df4a22",
  verde:"#597352",celeste:"#5baab8",grisClaro:"#f4f3f0",grisMedio:"#e8e6e1",grisTexto:"#6b6b6b",
  purpura:"#534AB7",marketing:"#9b3fbf",
};

const CREDENTIALS = {
  martin:     { pass:"Socio_1",         rolId:"martin"     },
  ramiro:     { pass:"Socio_2",         rolId:"ramiro"     },
  emmanuel:   { pass:"Socio_3",         rolId:"emmanuel"   },
  produccion: { pass:"MPP_1",           rolId:"produccion" },
  proyecto:   { pass:"Arraigo-2093_1",  rolId:"proyecto"   },
  obra:       { pass:"DDOs-Arraigo_1",  rolId:"obra"       },
  compras:    { pass:"CP-PM-L_1",       rolId:"compras"    },
  admin:      { pass:"ADM-Arraigo_1",   rolId:"admin"      },
  marketing:  { pass:"MARCA-Arraigo_1", rolId:"marketing"  },
};

const RUBROS = ["01-T.PRELIMINARES","02-MOV.SUELOS","03-FUNDACIONES","03E-FUNDACIONES(encofrado)","04-ESTRUCTURA Hº Aº","04E-ESTRUCTURA Hº Aº(encofrado)","05-ESTRUC.METALICA","06-MAMPOSTERIA","07-CONTRAPISO","08-CARPETA","09-REVOQUES","10-IMPERM. CUBIERTA","11-INSTA.CLOACAL","12-INSTA.PLUVIAL","13-INSTA.AGUA","14-INSTA.GAS","15-INSTA.ELECTRICA","16-INSTA.PISO RADIANTE","17-INSTA.AA","18-INSTA.ALARMA","19-CARPINTERIAS","20-HERRERIA","21-ZINGUERIA","22-PINTURA","23-CIELORRASOS","24-PISOS INT.","24-PISOS EXT.","24-ZOCALOS","25-REVEST.INT","26-REVEST.EXT","27-MARMOLERIA","28-PUERTAS.EXT","29-PUERTAS.INT","30-ARTEF.SANITARIOS","31-ARTEF.GAS","32-ARTEF.ILUMINACION","33-ARTEF.PISO RADIANTE","34-ARTEF.AA","35-ARTEF.ALARMA","36-MOBILIARIO","37-EQUIPAMIENTO","38-ELECTRODOMESTICOS","39-PILETA","40-PARQUIZACION","41-AYUDA GREMIO","42-LIMPIEZA OBRA","43-ESTRUC CUB Y CHAPA","44-INSTA.INCENDIOS","45-ASCENSORES","46-PUESTA EN MARCHA","47-INSTA.DATOS","48-ARTEF.INCENDIO","49-OBRA COMPLEMENTARIA","50-INFRAESTRUCTURA"];

const TIPOS = {
  materiales:{label:"Pedido de materiales",color:C.pizarra,bg:"#e8eef1"},
  manoObra:{label:"Avance de mano de obra",color:C.verde,bg:"#edf1eb"},
  visitaTecnica:{label:"Visita técnica",color:C.celeste,bg:"#e8f4f6"},
  traslado:{label:"Traslado de equipos",color:"#7a5c1e",bg:"#f5efe0"},
  urgencia:{label:"Devolución / Urgencia",color:C.acento,bg:"#faeae5"},
};
const EC={
  "Pendiente":{bg:"#fdf3e7",color:"#9a6500"},
  "En revisión":{bg:"#e8eef1",color:C.pizarra},
  "Aprobado":{bg:"#edf1eb",color:C.verde},
  "Rechazado":{bg:"#faeae5",color:C.acento},
};
const ESTADOS_SOL=["Pendiente","En revisión","Aprobado","Rechazado"];
const ESTADOS_OBRA={
  lanzamiento:{label:"En lanzamiento",color:C.acento,bg:"#faeae5"},
  activa:{label:"Activa",color:C.verde,bg:"#edf1eb"},
  finalizada:{label:"Finalizada",color:C.grisTexto,bg:C.grisMedio},
};
const ROLES_BASE=[
  {id:"obra",label:"Dirección de Obra",ini:"DO",color:C.pizarra,bg:"#e8eef1"},
  {id:"produccion",label:"Producción",ini:"PR",color:C.negro,bg:C.grisMedio},
  {id:"compras",label:"Compras y Logística",ini:"CL",color:"#7a5c1e",bg:"#f5efe0"},
  {id:"admin",label:"Administración / Finanzas",ini:"AF",color:C.verde,bg:"#edf1eb"},
  {id:"proyecto",label:"Proyecto",ini:"PY",color:C.celeste,bg:"#e4f3f6"},
];
const CUPULA=[
  {id:"martin",label:"Martín",sub:"Encargado de Proyecto",ini:"MA",color:C.purpura,bg:"#EEEDFE"},
  {id:"ramiro",label:"Ramiro",sub:"Dirección y Ejecución",ini:"RA",color:C.pizarra,bg:"#e8eef1"},
  {id:"emmanuel",label:"Emmanuel",sub:"Área Financiera",ini:"EM",color:C.verde,bg:"#edf1eb"},
];
const VISIBLE={
  obra:["materiales","manoObra","visitaTecnica","traslado","urgencia"],
  produccion:["materiales","manoObra","visitaTecnica","traslado","urgencia"],
  compras:["materiales","traslado","urgencia"],
  admin:["manoObra","materiales"],
  proyecto:["materiales","manoObra","visitaTecnica","traslado","urgencia"],
};
const TEAM_MARTIN=["Marcela","Lucía","Maximiliano","Rosario"];
const TEAM_RAMIRO=["Fernando","Joselo","María","Daiana","Priscila"];
const PROTOCOLO_BASE=[
  {rol:"proyecto",tarea:"Cargar planos y documentación técnica inicial"},
  {rol:"proyecto",tarea:"Publicar cómputo de materiales preliminar"},
  {rol:"proyecto",tarea:"Cargar presupuesto estimado por rubro"},
  {rol:"obra",tarea:"Confirmar recepción de documentación técnica"},
  {rol:"obra",tarea:"Relevar condiciones de acceso al terreno"},
  {rol:"obra",tarea:"Confirmar disponibilidad de equipo de trabajo"},
  {rol:"compras",tarea:"Verificar proveedores activos para la obra"},
  {rol:"compras",tarea:"Gestionar insumos iniciales de obra"},
  {rol:"admin",tarea:"Abrir legajo administrativo de la obra"},
  {rol:"admin",tarea:"Verificar contratos y documentación legal"},
];
const ROL_BADGE={
  proyecto:{label:"PY",color:C.celeste,bg:"#e4f3f6"},
  obra:{label:"DO",color:C.pizarra,bg:"#e8eef1"},
  compras:{label:"CL",color:"#7a5c1e",bg:"#f5efe0"},
  admin:{label:"AF",color:C.verde,bg:"#edf1eb"},
};

const initObras=[
  {id:"FA-E",nombre:"FORESTA-ALVEAR-E",estado:"activa",inicio:"Ene 2026",rubros:["04-ESTRUCTURA Hº Aº","05-ESTRUC.METALICA","06-MAMPOSTERIA"],protocolo:[]},
  {id:"FA-F",nombre:"FORESTA-ALVEAR-F",estado:"activa",inicio:"Feb 2026",rubros:["03-FUNDACIONES","04-ESTRUCTURA Hº Aº"],protocolo:[]},
  {id:"PEL",nombre:"PELLEGRINI",estado:"activa",inicio:"Nov 2025",rubros:["09-REVOQUES","22-PINTURA","19-CARPINTERIAS"],protocolo:[]},
  {id:"TER",nombre:"TERRAL",estado:"activa",inicio:"Mar 2026",rubros:["02-MOV.SUELOS","03-FUNDACIONES"],protocolo:[]},
  {id:"TAM",nombre:"TERRAL AL MAR",estado:"lanzamiento",inicio:"Abr 2026",rubros:["01-T.PRELIMINARES","02-MOV.SUELOS"],protocolo:PROTOCOLO_BASE.map((t,i)=>({id:i+1,...t,estado:"pendiente"}))},
  {id:"EPA",nombre:"E-PASTOR",estado:"activa",inicio:"Dic 2025",rubros:["15-INSTA.ELECTRICA","13-INSTA.AGUA","11-INSTA.CLOACAL"],protocolo:[]},
  {id:"UPI",nombre:"U-PILAR",estado:"lanzamiento",inicio:"May 2026",rubros:[],protocolo:PROTOCOLO_BASE.map((t,i)=>({id:i+1,...t,estado:"pendiente"}))},
  {id:"NL96",nombre:"NL96",estado:"activa",inicio:"Oct 2025",rubros:["22-PINTURA","24-PISOS INT.","19-CARPINTERIAS"],protocolo:[]},
  {id:"MZ121",nombre:"MZ121",estado:"finalizada",inicio:"Jun 2025",rubros:[],protocolo:[]},
];
const initSolicitudes=[
  {id:1,tipo:"materiales",obra:"FA-E",rubro:"04-ESTRUCTURA Hº Aº",titulo:"Hormigón H21 — Losa nivel 3",desc:"Se solicitan 18m³ para colada programada el jueves.",estado:"Aprobado",autor:"DO",fecha:"24 mar",comentarios:[{rol:"PR",texto:"Aprobado. Coordinar entrega con logística."}],remito:null,pedidoId:null},
  {id:2,tipo:"manoObra",obra:"FA-E",rubro:"05-ESTRUC.METALICA",titulo:"Avance semana 12 — Estructura metálica",desc:"Completado 78% de la estructura metálica del sector B.",estado:"En revisión",autor:"DO",fecha:"25 mar",comentarios:[],remito:null,pedidoId:null},
  {id:3,tipo:"visitaTecnica",obra:"FA-E",rubro:"03-FUNDACIONES",titulo:"Inspección columnas de fundación",desc:"Fisuras menores detectadas en C-4 y C-7.",estado:"Pendiente",autor:"DO",fecha:"26 mar",comentarios:[],remito:null,pedidoId:null},
  {id:4,tipo:"traslado",obra:"TAM",rubro:"41-AYUDA GREMIO",titulo:"Grúa torre — traslado a sector C",desc:"Se requiere traslado para inicio del lunes.",estado:"En revisión",autor:"DO",fecha:"26 mar",comentarios:[{rol:"CL",texto:"Verificando disponibilidad de transporte."}],remito:null,pedidoId:null},
  {id:5,tipo:"urgencia",obra:"FA-E",rubro:"06-MAMPOSTERIA",titulo:"URGENTE: Cemento portland en mal estado",desc:"40 bolsas en malas condiciones. Solicito devolución.",estado:"Pendiente",autor:"DO",fecha:"27 mar",comentarios:[],remito:null,pedidoId:null},
  {id:6,tipo:"materiales",obra:"TER",rubro:"02-MOV.SUELOS",titulo:"Solicitud retroexcavadora",desc:"Necesitamos retroexcavadora por 3 días para fundaciones.",estado:"Pendiente",autor:"DO",fecha:"27 mar",comentarios:[],remito:null,pedidoId:null},
  {id:7,tipo:"manoObra",obra:"EPA",rubro:"15-INSTA.ELECTRICA",titulo:"Avance instalación eléctrica PB",desc:"Completado 60% del tendido de cañerías planta baja.",estado:"Pendiente",autor:"DO",fecha:"28 mar",comentarios:[],remito:null,pedidoId:null},
];
const initDocs=[
  {id:1,nombre:"Planos_Estructura_RevB.pdf",tipo:"Planos",obra:"FA-E",fecha:"20 mar",nuevo:false},
  {id:2,nombre:"Memoria_Descriptiva_v2.pdf",tipo:"Memoria",obra:"FA-E",fecha:"22 mar",nuevo:false},
  {id:3,nombre:"Especificaciones_Técnicas.pdf",tipo:"Especificaciones",obra:"TAM",fecha:"23 mar",nuevo:true},
];
const initComputo=[
  {id:1,rubro:"04-ESTRUCTURA Hº Aº",obra:"FA-E",descripcion:"Hormigón H21",unidad:"m³",cantidad:120,pedido:18},
  {id:2,rubro:"06-MAMPOSTERIA",obra:"FA-E",descripcion:"Ladrillo cerámico 12x18x33",unidad:"mil",cantidad:45,pedido:0},
  {id:3,rubro:"05-ESTRUC.METALICA",obra:"FA-E",descripcion:"Perfil IPN 200",unidad:"ml",cantidad:340,pedido:0},
  {id:4,rubro:"09-REVOQUES",obra:"FA-E",descripcion:"Revoque grueso interior",unidad:"m²",cantidad:860,pedido:0},
];
const initPresupuesto=[
  {rubro:"04-ESTRUCTURA Hº Aº",obra:"FA-E",monto:2800000,publicado:true},
  {rubro:"05-ESTRUC.METALICA",obra:"FA-E",monto:1950000,publicado:true},
  {rubro:"06-MAMPOSTERIA",obra:"FA-E",monto:420000,publicado:false},
  {rubro:"09-REVOQUES",obra:"FA-E",monto:310000,publicado:false},
];
const initBuzon=[
  {id:1,titulo:"Actualización planos estructura — Rev B",desc:"Cotas modificadas en columnas C-4 a C-9.",obra:"FA-E",fecha:"22 mar",leido:false},
];
const initContratos=[
  {id:1,rubro:"02-MOV.SUELOS",obra:"TAM",descripcion:"Movimiento de suelos sector A-B",contrato:15000000,avance:50,estado:"Activo"},
  {id:2,rubro:"04-ESTRUCTURA Hº Aº",obra:"FA-E",descripcion:"Estructura hormigón armado",contrato:28000000,avance:30,estado:"Activo"},
  {id:3,rubro:"05-ESTRUC.METALICA",obra:"FA-E",descripcion:"Estructura metálica cubierta",contrato:19500000,avance:78,estado:"Activo"},
  {id:4,rubro:"11-INSTA.CLOACAL",obra:"EPA",descripcion:"Instalación cloacal completa",contrato:4200000,avance:0,estado:"Pendiente inicio"},
];
const initTareas=[
  {id:1,titulo:"Revisión planos Rev B — columnas C4 a C9",asignado:"Marcela",lanzadoPor:"martin",obra:"FA-E",estado:"pendiente",fecha:"25 mar",tipo:"tarea"},
  {id:2,titulo:"Confirmar fecha de hormigonado losa nivel 3",asignado:"Fernando",lanzadoPor:"ramiro",obra:"FA-E",estado:"confirmado",fecha:"24 mar",tipo:"consulta"},
];
let pedidoCnt=2,tareaIdCnt=10,obraIdCnt=100;

const fmt=n=>"$"+Number(n).toLocaleString("es-AR");
const Pill=({label,color,bg,small})=><span style={{fontSize:small?10:11,padding:small?"2px 7px":"3px 9px",borderRadius:20,background:bg,color,fontWeight:500,whiteSpace:"nowrap",letterSpacing:.3}}>{label}</span>;
const Avatar=({txt,color,bg,size=36})=><div style={{width:size,height:size,borderRadius:"50%",background:bg,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:500,fontSize:size*.33,color,flexShrink:0}}>{txt}</div>;
const Sec=({title,mt})=><div style={{fontSize:10,color:C.grisTexto,letterSpacing:.7,textTransform:"uppercase",marginBottom:6,marginTop:mt||4}}>{title}</div>;
const ObraChip=({id,obras})=>{const o=obras.find(x=>x.id===id);if(!o)return null;const es=ESTADOS_OBRA[o.estado];return <span style={{fontSize:10,padding:"2px 7px",borderRadius:10,background:es.bg,color:es.color,fontWeight:500}}>{o.nombre}</span>;};

export default function App(){
  const [introPhase,setIntroPhase]=useState("arraigo");
  const [loginUser,setLoginUser]=useState("");
  const [loginPass,setLoginPass]=useState("");
  const [loginError,setLoginError]=useState("");
  const [shake,setShake]=useState(false);
  const [rolId,setRolId]=useState(null);
  const [obras,setObras]=useState(initObras);
  const [solicitudes,setSolicitudes]=useState(initSolicitudes);
  const [docs,setDocs]=useState(initDocs);
  const [computo,setComputo]=useState(initComputo);
  const [presupuesto,setPresupuesto]=useState(initPresupuesto);
  const [buzon,setBuzon]=useState(initBuzon);
  const [contratos,setContratos]=useState(initContratos);
  const [tareas,setTareas]=useState(initTareas);
  const [vista,setVista]=useState("obras");
  const [tab,setTab]=useState("obras");
  const [obraFiltro,setObraFiltro]=useState(null);
  const [detalleId,setDetalleId]=useState(null);
  const [obraDetalleId,setObraDetalleId]=useState(null);
  const [comentario,setComentario]=useState("");
  const [remitoVal,setRemitoVal]=useState("");
  const [formSol,setFormSol]=useState({tipo:"materiales",rubro:RUBROS[0],titulo:"",desc:""});
  const [formDoc,setFormDoc]=useState({nombre:"",tipo:"Planos"});
  const [formBuzon,setFormBuzon]=useState({titulo:"",desc:""});
  const [formPres,setFormPres]=useState({rubro:RUBROS[0],monto:""});
  const [formPedido,setFormPedido]=useState(null);
  const [formObra,setFormObra]=useState(null);
  const [formTarea,setFormTarea]=useState({titulo:"",asignado:"",tipo:"tarea"});
  const [lanzandoTarea,setLanzandoTarea]=useState(false);
  const [formContrato,setFormContrato]=useState(null);

  useEffect(()=>{
    if(introPhase==="arraigo") setTimeout(()=>setIntroPhase("link"),1400);
    else if(introPhase==="link") setTimeout(()=>setIntroPhase("fade"),1400);
    else if(introPhase==="fade") setTimeout(()=>setIntroPhase("login"),700);
  },[introPhase]);

  const handleLogin=()=>{
    const u=loginUser.trim().toLowerCase();
    const cred=CREDENTIALS[u];
    if(cred&&cred.pass===loginPass.trim()){
      setRolId(cred.rolId);
      const isCupula=["martin","ramiro","emmanuel"].includes(cred.rolId);
      setVista(isCupula?"dashboard":"obras");
      setTab(isCupula?"overview":"obras");
      setIntroPhase("done");
    } else {
      setLoginError("Usuario o contraseña incorrectos");
      setShake(true);
      setTimeout(()=>setShake(false),500);
    }
  };

  const rol=ROLES_BASE.find(r=>r.id===rolId);
  const cupula=CUPULA.find(r=>r.id===rolId);
  const buzonNoLeido=buzon.filter(b=>!b.leido).length;
  const solVisibles=rolId&&!cupula?solicitudes.filter(s=>VISIBLE[rolId]?.includes(s.tipo)&&(!obraFiltro||s.obra===obraFiltro)):[];
  const item=detalleId?solicitudes.find(s=>s.id===detalleId):null;
  const obraDetalle=obraDetalleId?obras.find(o=>o.id===obraDetalleId):null;

  const inp={width:"100%",fontSize:13,padding:"8px 10px",borderRadius:6,border:`1px solid ${C.grisMedio}`,background:C.blanco,color:C.negro,boxSizing:"border-box",fontFamily:"'Work Sans',system-ui,sans-serif"};
  const btnP={fontSize:13,padding:"8px 18px",borderRadius:6,border:"none",background:C.acento,color:C.blanco,fontWeight:600,cursor:"pointer"};
  const btnS={fontSize:12,padding:"7px 12px",borderRadius:6,border:`1px solid ${C.grisMedio}`,background:C.blanco,color:C.negro,cursor:"pointer"};

  const go=v=>{setVista(v);setDetalleId(null);setObraDetalleId(null);};
  const logout=()=>{setRolId(null);setObraFiltro(null);setVista("obras");setTab("obras");setDetalleId(null);setObraDetalleId(null);setIntroPhase("login");setLoginUser("");setLoginPass("");setLoginError("");};

  const cambiarEstado=(id,e)=>setSolicitudes(p=>p.map(s=>s.id===id?{...s,estado:e}:s));
  const enviarComentario=(id)=>{if(!comentario.trim())return;const ini=(cupula||rol)?.ini||"??";setSolicitudes(p=>p.map(s=>s.id===id?{...s,comentarios:[...s.comentarios,{rol:ini,texto:comentario}]}:s));setComentario("");};
  const cargarRemito=(id)=>{if(!remitoVal.trim())return;setSolicitudes(p=>p.map(s=>s.id===id?{...s,remito:remitoVal}:s));setRemitoVal("");};
  const crearSolicitud=()=>{if(!formSol.titulo.trim())return;setSolicitudes(p=>[{id:Date.now(),tipo:formSol.tipo,rubro:formSol.rubro,obra:obraFiltro||"FA-E",titulo:formSol.titulo,desc:formSol.desc,estado:"Pendiente",autor:"DO",fecha:"28 mar",comentarios:[],remito:null,pedidoId:null},...p]);setFormSol({tipo:"materiales",rubro:RUBROS[0],titulo:"",desc:""});go("lista");};
  const subirDoc=()=>{if(!formDoc.nombre.trim())return;setDocs(p=>[{id:Date.now(),nombre:formDoc.nombre,tipo:formDoc.tipo,obra:obraFiltro||"FA-E",fecha:"28 mar",nuevo:true},...p]);setFormDoc({nombre:"",tipo:"Planos"});};
  const publicarBuzon=()=>{if(!formBuzon.titulo.trim())return;setBuzon(p=>[{id:Date.now(),...formBuzon,obra:obraFiltro||"FA-E",fecha:"28 mar",leido:false},...p]);setFormBuzon({titulo:"",desc:""});};
  const marcarLeido=(id)=>setBuzon(p=>p.map(b=>b.id===id?{...b,leido:true}:b));
  const agregarPres=()=>{if(!formPres.monto)return;setPresupuesto(p=>[...p,{rubro:formPres.rubro,obra:obraFiltro||"FA-E",monto:Number(formPres.monto),publicado:false}]);setFormPres({rubro:RUBROS[0],monto:""});};
  const togglePres=(rubro)=>setPresupuesto(p=>p.map(r=>r.rubro===rubro?{...r,publicado:!r.publicado}:r));
  const genPedidoId=(rubro)=>{const n=String(pedidoCnt++).padStart(3,"0");return`2026-03-28/ARRAIGO/${rubro}/P-${n}`;};
  const confirmarPedido=()=>{if(!formPedido)return;setSolicitudes(p=>[{id:Date.now(),tipo:"materiales",obra:obraFiltro||"FA-E",rubro:formPedido.rubro,titulo:`Pedido parcial — ${formPedido.descripcion}`,desc:`Cantidad: ${formPedido.cant} ${formPedido.unidad}.\nID: ${formPedido.nomenclatura}`,estado:"Pendiente",autor:"DO",fecha:"28 mar",comentarios:[],remito:null,pedidoId:formPedido.nomenclatura},...p]);setComputo(p=>p.map(c=>c.id===formPedido.itemId?{...c,pedido:c.pedido+Number(formPedido.cant)}:c));setFormPedido(null);};
  const lanzarTarea=()=>{if(!formTarea.titulo.trim()||!formTarea.asignado)return;setTareas(p=>[{id:tareaIdCnt++,...formTarea,lanzadoPor:rolId,obra:obraFiltro||"FA-E",estado:"pendiente",fecha:"28 mar"},...p]);setFormTarea({titulo:"",asignado:"",tipo:"tarea"});setLanzandoTarea(false);};
  const confirmarTarea=(id)=>setTareas(p=>p.map(t=>t.id===id?{...t,estado:"confirmado"}:t));
  const confirmarProto=(obraId,tareaId)=>setObras(p=>p.map(o=>o.id===obraId?{...o,protocolo:o.protocolo.map(t=>t.id===tareaId?{...t,estado:"completado"}:t)}:o));
  const activarObra=(id)=>setObras(p=>p.map(o=>o.id===id?{...o,estado:"activa"}:o));
  const crearObra=()=>{if(!formObra?.nombre?.trim())return;const id="OB"+String(obraIdCnt++);setObras(p=>[...p,{id,nombre:formObra.nombre,estado:"lanzamiento",inicio:formObra.inicio||"Próximamente",rubros:[],protocolo:PROTOCOLO_BASE.map((t,i)=>({id:i+1,...t,estado:"pendiente"}))}]);setFormObra(null);};

  // ── INTRO ──
  if(introPhase!=="login"&&introPhase!=="done") return(
    <div style={{fontFamily:"'Work Sans',system-ui,sans-serif",minHeight:520,display:"flex",alignItems:"center",justifyContent:"center",background:C.blanco}}>
      <style>{`
        @keyframes riseUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes fadeOut{from{opacity:1}to{opacity:0}}
      `}</style>
      {introPhase==="arraigo"&&(
        <div style={{animation:"riseUp .9s ease forwards",textAlign:"center"}}>
          <div style={{fontSize:36,fontWeight:700,letterSpacing:6}}>ARRAIGO</div>
          <div style={{fontSize:11,color:C.grisTexto,letterSpacing:3,marginTop:4}}>Humanizamos la construcción</div>
        </div>
      )}
      {introPhase==="link"&&(
        <div style={{textAlign:"center",animation:"fadeIn .4s ease forwards"}}>
          <div style={{fontSize:36,fontWeight:700,letterSpacing:6}}>ARRAIGO</div>
          <div style={{fontSize:11,color:C.grisTexto,letterSpacing:3,marginTop:4}}>Humanizamos la construcción</div>
          <div style={{width:36,height:2,background:C.acento,margin:"14px auto"}}/>
          <div style={{fontSize:28,fontWeight:700,letterSpacing:4,color:C.acento,animation:"riseUp .7s ease forwards"}}>LINK</div>
        </div>
      )}
      {introPhase==="fade"&&(
        <div style={{textAlign:"center",animation:"fadeOut .6s ease forwards"}}>
          <div style={{fontSize:36,fontWeight:700,letterSpacing:6}}>ARRAIGO</div>
          <div style={{fontSize:11,color:C.grisTexto,letterSpacing:3,marginTop:4}}>Humanizamos la construcción</div>
          <div style={{width:36,height:2,background:C.acento,margin:"14px auto"}}/>
          <div style={{fontSize:28,fontWeight:700,letterSpacing:4,color:C.acento}}>LINK</div>
        </div>
      )}
    </div>
  );

  // ── LOGIN ──
  if(introPhase==="login"&&!rolId) return(
    <div style={{fontFamily:"'Work Sans',system-ui,sans-serif",minHeight:520,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:C.blanco,padding:"2rem"}}>
      <style>{`
        @keyframes fadeInUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shake{0%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-6px)}80%{transform:translateX(6px)}100%{transform:translateX(0)}}
      `}</style>
      <div style={{animation:"fadeInUp .6s ease forwards",width:"100%",maxWidth:340}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{fontSize:26,fontWeight:700,letterSpacing:4}}>LINK</div>
          <div style={{fontSize:11,color:C.grisTexto,letterSpacing:2,marginTop:2}}>ARRAIGO · Humanizamos la construcción</div>
          <div style={{width:36,height:2,background:C.acento,margin:"10px auto 0"}}/>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div>
            <Sec title="Usuario"/>
            <input value={loginUser} onChange={e=>{setLoginUser(e.target.value);setLoginError("");}} onKeyDown={e=>e.key==="Enter"&&handleLogin()} placeholder="ej: martin" style={{...inp,border:`1px solid ${loginError?C.acento:C.grisMedio}`,fontSize:14,padding:"10px 12px",borderRadius:8}}/>
          </div>
          <div>
            <Sec title="Contraseña"/>
            <input type="password" value={loginPass} onChange={e=>{setLoginPass(e.target.value);setLoginError("");}} onKeyDown={e=>e.key==="Enter"&&handleLogin()} placeholder="••••••••" style={{...inp,border:`1px solid ${loginError?C.acento:C.grisMedio}`,fontSize:14,padding:"10px 12px",borderRadius:8}}/>
          </div>
          {loginError&&<div style={{fontSize:12,color:C.acento,textAlign:"center"}}>{loginError}</div>}
          <button onClick={handleLogin} style={{...btnP,padding:"11px",borderRadius:8,fontSize:14,animation:shake?"shake .4s ease":"none",marginTop:4}}>
            Ingresar
          </button>
        </div>
        <div style={{marginTop:24,fontSize:11,color:C.grisMedio,textAlign:"center"}}>LINK — Sistema de gestión de obra · Arraigo</div>
      </div>
    </div>
  );

  // ── TOPBAR ──
  const TopBar=({titulo,showNueva,onNueva})=>{
    const u=cupula||rol;
    return(
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 16px",borderBottom:`1px solid ${C.grisMedio}`,background:C.blanco,flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:8,overflow:"hidden"}}>
          <div style={{fontSize:15,fontWeight:700,letterSpacing:2,flexShrink:0}}>LINK</div>
          <div style={{width:1,height:13,background:C.grisMedio,flexShrink:0}}/>
          <div style={{fontSize:10,color:C.grisTexto,flexShrink:0}}>ARRAIGO</div>
          {titulo&&<><div style={{width:1,height:13,background:C.grisMedio,flexShrink:0}}/><div style={{fontSize:11,color:C.grisTexto,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{titulo}</div></>}
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0}}>
          {buzonNoLeido>0&&!cupula&&rolId!=="proyecto"&&(<div onClick={()=>go("buzon")} style={{fontSize:11,padding:"3px 9px",borderRadius:20,background:"#faeae5",color:C.acento,fontWeight:600,cursor:"pointer"}}>{buzonNoLeido} aviso{buzonNoLeido>1?"s":""}</div>)}
          {showNueva&&<button onClick={onNueva} style={{fontSize:11,padding:"5px 12px",borderRadius:6,border:"none",background:C.acento,color:C.blanco,cursor:"pointer",fontWeight:500}}>+ Nueva</button>}
          {u&&<Avatar txt={u.ini} color={u.color} bg={u.bg} size={28}/>}
          <button onClick={logout} style={{fontSize:11,padding:"4px 8px",border:`1px solid ${C.grisMedio}`,borderRadius:6,background:"none",color:C.grisTexto,cursor:"pointer"}}>salir</button>
        </div>
      </div>
    );
  };

  const Back=({to,label})=><button onClick={()=>go(to||"lista")} style={{background:"none",border:"none",cursor:"pointer",fontSize:12,color:C.grisTexto,marginBottom:14,padding:0}}>← {label||"Volver"}</button>;

  // ── MARKETING ──
  if(rolId==="marketing") return(
    <div style={{fontFamily:"'Work Sans',system-ui,sans-serif",background:C.blanco,minHeight:480,display:"flex",flexDirection:"column"}}>
      <TopBar titulo="Marketing"/>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"2rem",textAlign:"center",gap:16}}>
        <Avatar txt="SO" color={C.marketing} bg="#f3e8fb" size={56}/>
        <div style={{fontSize:17,fontWeight:500}}>Marketing</div>
        <div style={{fontSize:13,color:C.grisTexto,maxWidth:260,lineHeight:1.7}}>Este espacio está siendo preparado.<br/>Sofía va a definir cómo funciona.</div>
        <div style={{fontSize:11,padding:"6px 16px",borderRadius:20,background:"#f3e8fb",color:C.marketing,fontWeight:500}}>Próximamente</div>
      </div>
    </div>
  );

  // ── DETALLE SOLICITUD ──
  if(vista==="detalle"&&item){
    const t=TIPOS[item.tipo],ec=EC[item.estado];
    const puedeEstado=["produccion"].includes(rolId)||cupula?.id==="ramiro";
    const puedeComent=["produccion","compras","proyecto"].includes(rolId)||cupula;
    const puedeRemito=rolId==="compras";
    return(
      <div style={{fontFamily:"'Work Sans',system-ui,sans-serif",background:C.blanco,minHeight:480}}>
        <TopBar titulo={cupula?.label||rol?.label}/>
        <div style={{padding:"14px 16px"}}>
          <Back to="obras"/>
          <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:10}}>
            <Pill label={t.label} color={t.color} bg={t.bg}/><Pill label={item.estado} color={ec.color} bg={ec.bg}/><ObraChip id={item.obra} obras={obras}/>
            {item.rubro&&<span style={{fontSize:11,padding:"3px 9px",borderRadius:20,background:"#e8eef1",color:C.pizarra}}>{item.rubro}</span>}
          </div>
          {item.pedidoId&&<div style={{fontSize:11,color:C.celeste,marginBottom:6}}>ID: {item.pedidoId}</div>}
          <div style={{fontSize:17,fontWeight:600,marginBottom:4,lineHeight:1.3}}>{item.titulo}</div>
          <div style={{fontSize:12,color:C.grisTexto,marginBottom:12}}>{item.fecha} · {item.autor}</div>
          <div style={{fontSize:13,lineHeight:1.7,marginBottom:16,paddingBottom:16,borderBottom:`1px solid ${C.grisMedio}`,whiteSpace:"pre-line"}}>{item.desc}</div>
          {item.remito&&<div style={{background:"#edf1eb",borderRadius:8,padding:"8px 12px",fontSize:13,color:C.verde,marginBottom:12}}>Remito: <strong>{item.remito}</strong></div>}
          {puedeEstado&&(<div style={{marginBottom:14}}><Sec title="Cambiar estado"/><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{ESTADOS_SOL.map(e=><button key={e} onClick={()=>cambiarEstado(item.id,e)} style={{fontSize:12,padding:"5px 13px",borderRadius:20,border:`1.5px solid ${EC[e].color}`,background:item.estado===e?EC[e].bg:"transparent",color:EC[e].color,cursor:"pointer",fontWeight:item.estado===e?600:400}}>{e}</button>)}</div></div>)}
          {item.comentarios.length>0&&(<div style={{marginBottom:12}}><Sec title="Actividad"/>{item.comentarios.map((c,i)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:8}}><Avatar txt={c.rol} color={C.pizarra} bg="#e8eef1" size={28}/><div style={{background:C.grisClaro,borderRadius:8,padding:"7px 11px",fontSize:13,flex:1,lineHeight:1.5}}>{c.texto}</div></div>))}</div>)}
          {puedeComent&&(<div style={{display:"flex",gap:8,marginBottom:12}}><input value={comentario} onChange={e=>setComentario(e.target.value)} placeholder="Agregar comentario..." style={{...inp,flex:1}} onKeyDown={e=>e.key==="Enter"&&enviarComentario(item.id)}/><button onClick={()=>enviarComentario(item.id)} style={btnP}>Enviar</button></div>)}
          {puedeRemito&&!item.remito&&(<div><Sec title="Cargar remito / factura"/><div style={{display:"flex",gap:8}}><input value={remitoVal} onChange={e=>setRemitoVal(e.target.value)} placeholder="Número o nombre del documento..." style={{...inp,flex:1}}/><button onClick={()=>cargarRemito(item.id)} style={btnS}>Cargar</button></div></div>)}
        </div>
      </div>
    );
  }

  // ── DETALLE OBRA ──
  if(obraDetalle){
    const es=ESTADOS_OBRA[obraDetalle.estado];
    const pct=obraDetalle.protocolo.length>0?Math.round(obraDetalle.protocolo.filter(t=>t.estado==="completado").length/obraDetalle.protocolo.length*100):100;
    const solObra=solicitudes.filter(s=>s.obra===obraDetalle.id);
    return(
      <div style={{fontFamily:"'Work Sans',system-ui,sans-serif",background:C.blanco,minHeight:480}}>
        <TopBar titulo={obraDetalle.nombre}/>
        <div style={{padding:"14px 16px"}}>
          <Back to="obras" label="Portfolio"/>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
            <div style={{fontSize:17,fontWeight:600}}>{obraDetalle.nombre}</div>
            <Pill label={es.label} color={es.color} bg={es.bg}/>
          </div>
          <div style={{fontSize:12,color:C.grisTexto,marginBottom:16}}>Inicio: {obraDetalle.inicio}</div>
          {obraDetalle.protocolo.length>0&&(
            <div style={{marginBottom:18}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}><Sec title="Protocolo de inicio"/><span style={{fontSize:11,color:pct===100?C.verde:C.acento,fontWeight:600}}>{pct}%</span></div>
              <div style={{height:6,background:C.grisMedio,borderRadius:4,marginBottom:10}}><div style={{height:"100%",width:`${pct}%`,background:pct===100?C.verde:C.acento,borderRadius:4}}/></div>
              {obraDetalle.protocolo.map(t=>{
                const rb=ROL_BADGE[t.rol]||{label:t.rol,color:C.grisTexto,bg:C.grisMedio};
                const puedeOk=rolId==="produccion"||(rolId&&rolId===t.rol);
                return(
                  <div key={t.id} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:`1px solid ${C.grisMedio}`}}>
                    <div style={{width:15,height:15,borderRadius:"50%",border:`1.5px solid ${t.estado==="completado"?C.verde:C.grisMedio}`,background:t.estado==="completado"?C.verde:"transparent",flexShrink:0}}/>
                    <div style={{flex:1,fontSize:12,color:t.estado==="completado"?C.grisTexto:C.negro,textDecoration:t.estado==="completado"?"line-through":"none",lineHeight:1.4}}>{t.tarea}</div>
                    <Pill label={rb.label} color={rb.color} bg={rb.bg} small/>
                    {t.estado==="pendiente"&&puedeOk&&(<button onClick={()=>confirmarProto(obraDetalle.id,t.id)} style={{fontSize:10,padding:"3px 8px",borderRadius:6,border:`1px solid ${C.verde}`,background:"#edf1eb",color:C.verde,cursor:"pointer"}}>✓</button>)}
                  </div>
                );
              })}
              {pct===100&&obraDetalle.estado==="lanzamiento"&&rolId==="produccion"&&(
                <button onClick={()=>{activarObra(obraDetalle.id);setObraDetalleId(null);}} style={{...btnP,marginTop:12,width:"100%",padding:"10px",background:C.verde}}>Activar obra →</button>
              )}
            </div>
          )}
          {obraDetalle.rubros.length>0&&(<div style={{marginBottom:14}}><Sec title="Rubros en ejecución"/><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{obraDetalle.rubros.map(r=><span key={r} style={{fontSize:11,padding:"3px 9px",borderRadius:6,background:"#e8eef1",color:C.pizarra}}>{r}</span>)}</div></div>)}
          {solObra.length>0&&(
            <div>
              <Sec title={`Solicitudes (${solObra.length})`}/>
              {solObra.map(s=>{const tp=TIPOS[s.tipo],ec=EC[s.estado];return(
                <div key={s.id} onClick={()=>{setDetalleId(s.id);setVista("detalle");}} style={{border:`1px solid ${C.grisMedio}`,borderRadius:8,padding:"10px 12px",marginBottom:6,cursor:"pointer"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=C.acento}
                  onMouseLeave={e=>e.currentTarget.style.borderColor=C.grisMedio}>
                  <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:4}}><Pill label={tp.label} color={tp.color} bg={tp.bg} small/><Pill label={s.estado} color={ec.color} bg={ec.bg} small/></div>
                  <div style={{fontSize:13,fontWeight:500}}>{s.titulo}</div>
                  <div style={{fontSize:11,color:C.grisTexto,marginTop:2}}>{s.rubro} · {s.fecha}</div>
                </div>
              );})}
            </div>
          )}
          <div style={{marginTop:14}}>
            <button onClick={()=>{setObraFiltro(obraDetalle.id);setObraDetalleId(null);go("obras");}} style={btnP}>Ver solicitudes</button>
          </div>
        </div>
      </div>
    );
  }

  // ── PORTFOLIO OBRAS ──
  const PortfolioObras=({puedeCrear})=>(
    <div>
      {puedeCrear&&(
        formObra?(
          <div style={{background:C.grisClaro,borderRadius:10,padding:"12px",marginBottom:14}}>
            <div style={{fontSize:14,fontWeight:500,marginBottom:10}}>Nueva obra</div>
            <div style={{marginBottom:8}}><Sec title="Nombre"/><input value={formObra.nombre} onChange={e=>setFormObra(f=>({...f,nombre:e.target.value}))} placeholder="ej: COSTA-NORTE" style={inp}/></div>
            <div style={{marginBottom:12}}><Sec title="Inicio estimado"/><input value={formObra.inicio} onChange={e=>setFormObra(f=>({...f,inicio:e.target.value}))} placeholder="ej: Jun 2026" style={inp}/></div>
            <div style={{display:"flex",gap:8}}><button onClick={crearObra} style={btnP}>Lanzar obra</button><button onClick={()=>setFormObra(null)} style={btnS}>Cancelar</button></div>
          </div>
        ):(
          <button onClick={()=>setFormObra({nombre:"",inicio:""})} style={{...btnP,fontSize:12,padding:"6px 14px",marginBottom:12}}>+ Nueva obra</button>
        )
      )}
      <div style={{display:"grid",gap:8}}>
        {obras.map(o=>{
          const es=ESTADOS_OBRA[o.estado];
          const n=solicitudes.filter(s=>s.obra===o.id).length;
          const pp=o.protocolo.filter(t=>t.estado==="pendiente").length;
          const pct=o.protocolo.length>0?Math.round(o.protocolo.filter(t=>t.estado==="completado").length/o.protocolo.length*100):null;
          return(
            <div key={o.id} onClick={()=>setObraDetalleId(o.id)} style={{background:C.blanco,border:`1px solid ${C.grisMedio}`,borderRadius:10,padding:"12px 14px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}
              onMouseEnter={e=>e.currentTarget.style.borderColor=C.acento}
              onMouseLeave={e=>e.currentTarget.style.borderColor=C.grisMedio}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
                  <div style={{fontSize:14,fontWeight:600}}>{o.nombre}</div>
                  <Pill label={es.label} color={es.color} bg={es.bg} small/>
                </div>
                <div style={{fontSize:11,color:C.grisTexto}}>Inicio: {o.inicio}</div>
                {pct!==null&&(<div style={{marginTop:6}}><div style={{height:3,background:C.grisMedio,borderRadius:4}}><div style={{height:"100%",width:`${pct}%`,background:pct===100?C.verde:C.acento,borderRadius:4}}/></div><div style={{fontSize:10,color:C.grisTexto,marginTop:2}}>Protocolo {pct}%</div></div>)}
              </div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4,flexShrink:0}}>
                {n>0&&<span style={{fontSize:10,padding:"2px 7px",borderRadius:10,background:"#e8eef1",color:C.pizarra}}>{n} sol.</span>}
                {pp>0&&<span style={{fontSize:10,padding:"2px 7px",borderRadius:10,background:"#faeae5",color:C.acento}}>{pp} pend.</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── CÚPULA ──
  if(cupula){
    if(rolId==="martin"){
      const misT=tareas.filter(t=>t.lanzadoPor==="martin");
      const TABS=[["overview","Resumen"],["docs","Documentación"],["tareas","Tareas"],["actividad","Actividad"]];
      return(
        <div style={{fontFamily:"'Work Sans',system-ui,sans-serif",background:C.blanco,minHeight:520}}>
          <TopBar titulo="Martín · Proyecto"/>
          <div style={{display:"flex",borderBottom:`1px solid ${C.grisMedio}`,overflowX:"auto"}}>
            {TABS.map(([k,l])=><button key={k} onClick={()=>setTab(k)} style={{fontSize:12,padding:"9px 14px",border:"none",borderBottom:tab===k?`2px solid ${C.purpura}`:"2px solid transparent",background:"none",cursor:"pointer",color:tab===k?C.purpura:C.grisTexto,fontWeight:tab===k?600:400,whiteSpace:"nowrap"}}>{l}</button>)}
          </div>
          <div style={{padding:"14px 16px"}}>
            {tab==="overview"&&(<>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
                {[["Obras activas",obras.filter(o=>o.estado==="activa").length,C.purpura],["En lanzamiento",obras.filter(o=>o.estado==="lanzamiento").length,C.acento],["Docs publicados",docs.length,C.celeste]].map(([l,v,c])=>(
                  <div key={l} style={{background:C.grisClaro,borderRadius:8,padding:"10px 12px"}}><div style={{fontSize:10,color:C.grisTexto,textTransform:"uppercase",letterSpacing:.5,marginBottom:2}}>{l}</div><div style={{fontSize:22,fontWeight:600,color:c}}>{v}</div></div>
                ))}
              </div>
              <Sec title="Portfolio de obras"/>
              <PortfolioObras puedeCrear={false}/>
            </>)}
            {tab==="docs"&&docs.map(d=>(
              <div key={d.id} style={{border:`1px solid ${C.grisMedio}`,borderRadius:8,padding:"10px 13px",marginBottom:6,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{fontSize:13,fontWeight:500}}>{d.nombre}</div><div style={{display:"flex",gap:6,marginTop:3}}><span style={{fontSize:11,color:C.grisTexto}}>{d.tipo} · {d.fecha}</span><ObraChip id={d.obra} obras={obras}/></div></div>
                <div style={{display:"flex",gap:6}}>{d.nuevo&&<Pill label="Nuevo" color={C.celeste} bg="#e4f3f6"/>}<button style={btnS}>Previsualizar</button></div>
              </div>
            ))}
            {tab==="tareas"&&(<>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><Sec title="Tareas del equipo"/><button onClick={()=>setLanzandoTarea(true)} style={{...btnP,fontSize:11,padding:"5px 12px"}}>+ Lanzar tarea</button></div>
              {lanzandoTarea&&(
                <div style={{background:C.grisClaro,borderRadius:10,padding:"12px",marginBottom:12}}>
                  <div style={{marginBottom:8}}><Sec title="Tipo"/><select value={formTarea.tipo} onChange={e=>setFormTarea(f=>({...f,tipo:e.target.value}))} style={inp}><option value="tarea">Tarea</option><option value="consulta">Consulta</option></select></div>
                  <div style={{marginBottom:8}}><Sec title="Descripción"/><input value={formTarea.titulo} onChange={e=>setFormTarea(f=>({...f,titulo:e.target.value}))} placeholder="Describí la tarea..." style={inp}/></div>
                  <div style={{marginBottom:10}}><Sec title="Asignar a"/><select value={formTarea.asignado} onChange={e=>setFormTarea(f=>({...f,asignado:e.target.value}))} style={inp}><option value="">— Seleccioná —</option>{TEAM_MARTIN.map(p=><option key={p}>{p}</option>)}</select></div>
                  <div style={{display:"flex",gap:8}}><button onClick={lanzarTarea} style={btnP}>Lanzar</button><button onClick={()=>setLanzandoTarea(false)} style={btnS}>Cancelar</button></div>
                </div>
              )}
              {misT.map(t=>(
                <div key={t.id} style={{border:`1px solid ${C.grisMedio}`,borderRadius:8,padding:"10px 13px",marginBottom:6}}>
                  <div style={{display:"flex",justifyContent:"space-between",gap:6,marginBottom:4}}><div style={{fontSize:13,fontWeight:500}}>{t.titulo}</div><Pill label={t.estado==="confirmado"?"Confirmado":"Pendiente"} color={t.estado==="confirmado"?C.verde:"#9a6500"} bg={t.estado==="confirmado"?"#edf1eb":"#fdf3e7"}/></div>
                  <div style={{fontSize:11,color:C.grisTexto}}>{t.asignado} · <ObraChip id={t.obra} obras={obras}/> · {t.fecha}</div>
                  {t.estado==="pendiente"&&<button onClick={()=>confirmarTarea(t.id)} style={{...btnS,marginTop:6,fontSize:11,color:C.verde,borderColor:C.verde}}>Marcar hecho</button>}
                </div>
              ))}
            </>)}
            {tab==="actividad"&&[
              {area:"Proyecto",txt:"Especificaciones_Técnicas.pdf — TAM",t:"28 mar · 09:14",c:C.purpura,bg:"#EEEDFE"},
              {area:"DO",txt:"Pedido parcial: Hormigón H21 — FA-E",t:"28 mar · 08:50",c:C.pizarra,bg:"#e8eef1"},
              {area:"Proyecto",txt:"Aviso Rev B publicado — FA-E",t:"27 mar · 17:30",c:C.purpura,bg:"#EEEDFE"},
              {area:"DO",txt:"Visita técnica: columnas fundación — FA-E",t:"26 mar · 11:22",c:C.pizarra,bg:"#e8eef1"},
            ].map((a,i)=>(
              <div key={i} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:`1px solid ${C.grisMedio}`}}>
                <Pill label={a.area} color={a.c} bg={a.bg} small/><div style={{flex:1,fontSize:12}}>{a.txt}</div><div style={{fontSize:11,color:C.grisTexto,whiteSpace:"nowrap"}}>{a.t}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if(rolId==="ramiro"){
      const misT=tareas.filter(t=>t.lanzadoPor==="ramiro");
      const TABS=[["overview","Resumen"],["solicitudes","Dirección"],["cruce","Proyecto × DO"],["tareas","Consultas"]];
      return(
        <div style={{fontFamily:"'Work Sans',system-ui,sans-serif",background:C.blanco,minHeight:520}}>
          <TopBar titulo="Ramiro · Dirección"/>
          <div style={{display:"flex",borderBottom:`1px solid ${C.grisMedio}`,overflowX:"auto"}}>
            {TABS.map(([k,l])=><button key={k} onClick={()=>setTab(k)} style={{fontSize:12,padding:"9px 14px",border:"none",borderBottom:tab===k?`2px solid ${C.pizarra}`:"2px solid transparent",background:"none",cursor:"pointer",color:tab===k?C.pizarra:C.grisTexto,fontWeight:tab===k?600:400,whiteSpace:"nowrap"}}>{l}</button>)}
          </div>
          <div style={{padding:"14px 16px"}}>
            {tab==="overview"&&(<>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
                {[["Solicitudes",solicitudes.length,C.pizarra],["Pendientes",solicitudes.filter(s=>s.estado==="Pendiente").length,"#9a6500"],["Obras activas",obras.filter(o=>o.estado==="activa").length,C.verde]].map(([l,v,c])=>(
                  <div key={l} style={{background:C.grisClaro,borderRadius:8,padding:"10px 12px"}}><div style={{fontSize:10,color:C.grisTexto,textTransform:"uppercase",letterSpacing:.5,marginBottom:2}}>{l}</div><div style={{fontSize:22,fontWeight:600,color:c}}>{v}</div></div>
                ))}
              </div>
              <Sec title="Por obra"/>
              {obras.filter(o=>o.estado!=="finalizada").map(o=>{const n=solicitudes.filter(s=>s.obra===o.id).length;const p=solicitudes.filter(s=>s.obra===o.id&&s.estado==="Pendiente").length;return n>0?(<div key={o.id} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${C.grisMedio}`,fontSize:12}}><span style={{fontWeight:500}}>{o.nombre}</span><span style={{color:p>0?C.acento:C.grisTexto}}>{n} sol.{p>0?` · ${p} pend.`:""}</span></div>):null;})}
            </>)}
            {tab==="solicitudes"&&solicitudes.map(s=>{const t=TIPOS[s.tipo],ec=EC[s.estado];return(<div key={s.id} style={{border:`1px solid ${C.grisMedio}`,borderRadius:9,padding:"11px 13px",marginBottom:7}}><div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:5}}><Pill label={t.label} color={t.color} bg={t.bg}/><Pill label={s.estado} color={ec.color} bg={ec.bg}/><ObraChip id={s.obra} obras={obras}/></div><div style={{fontSize:13,fontWeight:500,marginBottom:2}}>{s.titulo}</div><div style={{fontSize:11,color:C.grisTexto}}>{s.rubro} · {s.fecha}</div></div>);})}
            {tab==="cruce"&&[
              {doc:"Planos_Estructura_RevB.pdf",obra:"FA-E",sol:"Inspección columnas de fundación",estado:"Pendiente",alerta:true,nota:"Aviso de cambio Rev B sin leer por DO"},
              {doc:"Memoria_Descriptiva_v2.pdf",obra:"FA-E",sol:"Avance semana 12 — Estructura",estado:"En revisión",alerta:false,nota:"Documentación consistente con avance"},
              {doc:"Especificaciones_Técnicas.pdf",obra:"TAM",sol:"Grúa torre — traslado sector C",estado:"En revisión",alerta:false,nota:"Obra en protocolo de lanzamiento"},
            ].map((r,i)=>(
              <div key={i} style={{border:`1px solid ${r.alerta?C.acento+"55":C.grisMedio}`,borderRadius:10,padding:"12px 14px",marginBottom:8,background:r.alerta?"#fdf3e7":C.blanco}}>
                <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:6}}><Pill label="DOC" color={C.purpura} bg="#EEEDFE" small/><Pill label={r.estado} color={EC[r.estado].color} bg={EC[r.estado].bg} small/><ObraChip id={r.obra} obras={obras}/></div>
                <div style={{fontSize:12,color:C.grisTexto,marginBottom:2}}>{r.doc}</div>
                <div style={{fontSize:13,fontWeight:500,marginBottom:4}}>{r.sol}</div>
                <div style={{fontSize:12,color:r.alerta?C.acento:C.grisTexto}}>{r.alerta?"⚠ ":""}{r.nota}</div>
              </div>
            ))}
            {tab==="tareas"&&(<>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><Sec title="Consultas al equipo"/><button onClick={()=>setLanzandoTarea(true)} style={{...btnP,fontSize:11,padding:"5px 12px"}}>+ Nueva</button></div>
              {lanzandoTarea&&(
                <div style={{background:C.grisClaro,borderRadius:10,padding:"12px",marginBottom:12}}>
                  <div style={{marginBottom:8}}><Sec title="Tipo"/><select value={formTarea.tipo} onChange={e=>setFormTarea(f=>({...f,tipo:e.target.value}))} style={inp}><option value="tarea">Tarea</option><option value="consulta">Consulta con confirmación</option></select></div>
                  <div style={{marginBottom:8}}><Sec title="Descripción"/><input value={formTarea.titulo} onChange={e=>setFormTarea(f=>({...f,titulo:e.target.value}))} placeholder="Describí..." style={inp}/></div>
                  <div style={{marginBottom:10}}><Sec title="Asignar a"/><select value={formTarea.asignado} onChange={e=>setFormTarea(f=>({...f,asignado:e.target.value}))} style={inp}><option value="">— Seleccioná —</option>{TEAM_RAMIRO.map(p=><option key={p}>{p}</option>)}</select></div>
                  <div style={{display:"flex",gap:8}}><button onClick={lanzarTarea} style={btnP}>Lanzar</button><button onClick={()=>setLanzandoTarea(false)} style={btnS}>Cancelar</button></div>
                </div>
              )}
              {misT.map(t=>(<div key={t.id} style={{border:`1px solid ${C.grisMedio}`,borderRadius:8,padding:"10px 13px",marginBottom:6}}><div style={{display:"flex",justifyContent:"space-between",gap:6,marginBottom:4}}><div style={{fontSize:13,fontWeight:500}}>{t.titulo}</div><Pill label={t.estado==="confirmado"?"Confirmado":"Esperando check"} color={t.estado==="confirmado"?C.verde:"#9a6500"} bg={t.estado==="confirmado"?"#edf1eb":"#fdf3e7"}/></div><div style={{fontSize:11,color:C.grisTexto}}>{t.asignado} · {t.fecha}</div>{t.estado==="pendiente"&&<button onClick={()=>confirmarTarea(t.id)} style={{...btnS,marginTop:6,fontSize:11,color:C.verde,borderColor:C.verde}}>Confirmar</button>}</div>))}
            </>)}
          </div>
        </div>
      );
    }
    if(rolId==="emmanuel"){
      const totalC=contratos.reduce((a,c)=>a+c.contrato,0);
      const totalE=contratos.reduce((a,c)=>a+Math.round(c.contrato*c.avance/100),0);
      const TABS=[["overview","Resumen"],["contratos","Contratos"],["flujo","Flujo"]];
      return(
        <div style={{fontFamily:"'Work Sans',system-ui,sans-serif",background:C.blanco,minHeight:520}}>
          <TopBar titulo="Emmanuel · Finanzas"/>
          <div style={{display:"flex",borderBottom:`1px solid ${C.grisMedio}`}}>
            {TABS.map(([k,l])=><button key={k} onClick={()=>setTab(k)} style={{fontSize:12,padding:"9px 14px",border:"none",borderBottom:tab===k?`2px solid ${C.verde}`:"2px solid transparent",background:"none",cursor:"pointer",color:tab===k?C.verde:C.grisTexto,fontWeight:tab===k?600:400}}>{l}</button>)}
          </div>
          <div style={{padding:"14px 16px"}}>
            {tab==="overview"&&(<>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
                <div style={{background:C.grisClaro,borderRadius:8,padding:"12px"}}><div style={{fontSize:10,color:C.grisTexto,textTransform:"uppercase",letterSpacing:.5,marginBottom:2}}>Total contratado</div><div style={{fontSize:20,fontWeight:600,color:C.pizarra}}>{fmt(totalC)}</div></div>
                <div style={{background:"#faeae5",borderRadius:8,padding:"12px"}}><div style={{fontSize:10,color:C.grisTexto,textTransform:"uppercase",letterSpacing:.5,marginBottom:2}}>Total exigido</div><div style={{fontSize:20,fontWeight:600,color:C.acento}}>{fmt(totalE)}</div></div>
              </div>
              <Sec title="Por obra"/>
              {obras.filter(o=>o.estado!=="finalizada").map(o=>{const cts=contratos.filter(c=>c.obra===o.id);const tot=cts.reduce((a,c)=>a+c.contrato,0);const ex=cts.reduce((a,c)=>a+Math.round(c.contrato*c.avance/100),0);return tot>0?(<div key={o.id} style={{padding:"8px 0",borderBottom:`1px solid ${C.grisMedio}`}}><div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}><span style={{fontWeight:500}}>{o.nombre}</span><span style={{color:C.acento}}>{fmt(ex)}</span></div><div style={{height:4,background:C.grisMedio,borderRadius:4}}><div style={{height:"100%",width:`${Math.round(ex/tot*100)}%`,background:C.verde,borderRadius:4}}/></div></div>):null;})}
            </>)}
            {tab==="contratos"&&(<>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><Sec title="Contratos activos"/>{!formContrato&&<button onClick={()=>setFormContrato({rubro:RUBROS[0],descripcion:"",contrato:"",avance:0,obra:"FA-E",estado:"Activo"})} style={{...btnP,fontSize:11,padding:"5px 12px"}}>+ Agregar</button>}</div>
              {formContrato&&(
                <div style={{background:C.grisClaro,borderRadius:10,padding:"12px",marginBottom:12}}>
                  <div style={{marginBottom:8}}><Sec title="Obra"/><select value={formContrato.obra} onChange={e=>setFormContrato(f=>({...f,obra:e.target.value}))} style={inp}>{obras.map(o=><option key={o.id} value={o.id}>{o.nombre}</option>)}</select></div>
                  <div style={{marginBottom:8}}><Sec title="Rubro"/><select value={formContrato.rubro} onChange={e=>setFormContrato(f=>({...f,rubro:e.target.value}))} style={inp}>{RUBROS.map(r=><option key={r}>{r}</option>)}</select></div>
                  <div style={{marginBottom:8}}><Sec title="Descripción"/><input value={formContrato.descripcion} onChange={e=>setFormContrato(f=>({...f,descripcion:e.target.value}))} style={inp}/></div>
                  <div style={{marginBottom:8}}><Sec title="Monto ($)"/><input type="number" value={formContrato.contrato} onChange={e=>setFormContrato(f=>({...f,contrato:e.target.value}))} style={inp}/></div>
                  <div style={{marginBottom:10}}><Sec title="Avance (%)"/><input type="number" min={0} max={100} value={formContrato.avance} onChange={e=>setFormContrato(f=>({...f,avance:Number(e.target.value)}))} style={inp}/></div>
                  <div style={{display:"flex",gap:8}}><button onClick={()=>{if(!formContrato.contrato)return;setContratos(p=>[...p,{id:Date.now(),...formContrato,contrato:Number(formContrato.contrato),descripcion:formContrato.descripcion||formContrato.rubro}]);setFormContrato(null);}} style={btnP}>Agregar</button><button onClick={()=>setFormContrato(null)} style={btnS}>Cancelar</button></div>
                </div>
              )}
              {contratos.map(c=>{const ex=Math.round(c.contrato*c.avance/100);return(<div key={c.id} style={{border:`1px solid ${C.grisMedio}`,borderRadius:10,padding:"12px 14px",marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6,marginBottom:4}}><div style={{fontSize:13,fontWeight:500}}>{c.descripcion}</div><ObraChip id={c.obra} obras={obras}/></div><div style={{fontSize:11,color:C.grisTexto,marginBottom:6}}>{c.rubro}</div><div style={{height:4,background:C.grisMedio,borderRadius:4,marginBottom:4}}><div style={{height:"100%",width:`${c.avance}%`,background:C.verde,borderRadius:4}}/></div><div style={{display:"flex",justifyContent:"space-between",fontSize:11}}><span>Contrato: <strong>{fmt(c.contrato)}</strong></span><span style={{color:C.acento}}>Exigido ({c.avance}%): <strong>{fmt(ex)}</strong></span></div></div>);})}
            </>)}
            {tab==="flujo"&&(<>
              {contratos.filter(c=>c.avance>0).map(c=>{const ex=Math.round(c.contrato*c.avance/100);return(<div key={c.id} style={{border:`1px solid ${C.grisMedio}`,borderRadius:10,padding:"12px 14px",marginBottom:8}}><div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}><span style={{fontSize:12,fontWeight:600,color:C.pizarra}}>{c.rubro}</span><ObraChip id={c.obra} obras={obras}/></div><div style={{display:"flex",fontSize:11}}>{[["Contrato",fmt(c.contrato),C.pizarra,"#e8eef1"],["Certificado "+c.avance+"%",fmt(ex),C.verde,"#edf1eb"],["Pedido pago",fmt(ex),C.acento,"#faeae5"]].map(([l,v,col,bg],i)=>(<div key={i} style={{flex:1,background:bg,padding:"7px 8px",borderRight:i<2?`1px solid ${C.blanco}`:"none",borderRadius:i===0?"6px 0 0 6px":i===2?"0 6px 6px 0":"0"}}><div style={{fontSize:10,color:C.grisTexto,marginBottom:2}}>{l}</div><div style={{fontSize:12,fontWeight:600,color:col}}>{v}</div></div>))}</div></div>);})}
              <div style={{marginTop:12,background:C.grisClaro,borderRadius:8,padding:"10px 12px"}}><div style={{fontSize:11,color:C.grisTexto,marginBottom:2}}>Total exigido acumulado</div><div style={{fontSize:20,fontWeight:600,color:C.acento}}>{fmt(totalE)}</div><div style={{fontSize:11,color:C.grisTexto,marginTop:2}}>{fmt(totalC)} contratados · {totalC>0?Math.round(totalE/totalC*100):0}%</div></div>
            </>)}
          </div>
        </div>
      );
    }
  }

  // ── VISTAS OPERATIVAS ──
  if(vista==="buzon") return(
    <div style={{fontFamily:"'Work Sans',system-ui,sans-serif",background:C.blanco,minHeight:480}}>
      <TopBar titulo={rol?.label}/>
      <div style={{padding:"14px 16px"}}>
        <Back to="obras" label="Volver"/>
        <Sec title="Avisos de Proyecto"/>
        {buzon.map(b=>(<div key={b.id} style={{background:b.leido?C.blanco:C.grisClaro,border:`1px solid ${b.leido?C.grisMedio:C.acento+"44"}`,borderRadius:10,padding:"12px 14px",marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",gap:8}}>
            <div><div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",marginBottom:4}}><div style={{fontSize:14,fontWeight:500}}>{b.titulo}</div><ObraChip id={b.obra} obras={obras}/></div><div style={{fontSize:12,color:C.grisTexto}}>{b.fecha}</div>{b.desc&&<div style={{fontSize:13,lineHeight:1.6,marginTop:4}}>{b.desc}</div>}</div>
            {!b.leido&&<button onClick={()=>marcarLeido(b.id)} style={{fontSize:11,padding:"4px 10px",borderRadius:6,border:`1px solid ${C.grisMedio}`,background:C.blanco,cursor:"pointer",color:C.grisTexto,whiteSpace:"nowrap",flexShrink:0}}>Leído</button>}
          </div>
        </div>))}
      </div>
    </div>
  );

  if(vista==="nueva") return(
    <div style={{fontFamily:"'Work Sans',system-ui,sans-serif",background:C.blanco,minHeight:480}}>
      <TopBar titulo="Dirección de Obra"/>
      <div style={{padding:"14px 16px"}}>
        <Back to="obras"/>
        <div style={{fontSize:16,fontWeight:600,marginBottom:16}}>Nueva solicitud{obraFiltro?` — ${obras.find(o=>o.id===obraFiltro)?.nombre}`:""}</div>
        <div style={{marginBottom:10}}><Sec title="Tipo"/><select value={formSol.tipo} onChange={e=>setFormSol(f=>({...f,tipo:e.target.value}))} style={inp}>{Object.entries(TIPOS).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}</select></div>
        <div style={{marginBottom:10}}><Sec title="Rubro"/><select value={formSol.rubro} onChange={e=>setFormSol(f=>({...f,rubro:e.target.value}))} style={inp}>{RUBROS.map(r=><option key={r} value={r}>{r}</option>)}</select></div>
        <div style={{marginBottom:10}}><Sec title="Título"/><input value={formSol.titulo} onChange={e=>setFormSol(f=>({...f,titulo:e.target.value}))} placeholder="Describí brevemente la solicitud..." style={inp}/></div>
        <div style={{marginBottom:18}}><Sec title="Detalle"/><textarea value={formSol.desc} onChange={e=>setFormSol(f=>({...f,desc:e.target.value}))} rows={4} style={{...inp,resize:"vertical"}}/></div>
        <button onClick={crearSolicitud} style={{...btnP,width:"100%",padding:"10px"}}>Enviar solicitud</button>
      </div>
    </div>
  );

  // OBRAS (vista principal operativa)
  const tabsMap={
    produccion:[["obras","Obras"],["solicitudes","Solicitudes"],["protocolo","Protocolos"]],
    proyecto:[["obras","Obras"],["docs","Documentación"],["computo","Cómputo"],["presupuesto","Presupuesto"],["buzon","Buzón"]],
    admin:[["obras","Obras"],["solicitudes","Solicitudes"],["presupuesto","Presupuesto"]],
    compras:[["obras","Obras"],["solicitudes","Solicitudes"]],
    obra:[["obras","Obras"],["solicitudes","Solicitudes"],["computo","Cómputo"]],
  };
  const myTabs=tabsMap[rolId]||tabsMap.obra;

  return(
    <div style={{fontFamily:"'Work Sans',system-ui,sans-serif",background:C.blanco,minHeight:520}}>
      <TopBar titulo={rol?.label} showNueva={rolId==="obra"&&tab==="solicitudes"} onNueva={()=>go("nueva")}/>
      <div style={{display:"flex",borderBottom:`1px solid ${C.grisMedio}`,overflowX:"auto"}}>
        {myTabs.map(([k,l])=><button key={k} onClick={()=>setTab(k)} style={{fontSize:12,padding:"9px 14px",border:"none",borderBottom:tab===k?`2px solid ${C.negro}`:"2px solid transparent",background:"none",cursor:"pointer",color:tab===k?C.negro:C.grisTexto,fontWeight:tab===k?600:400,whiteSpace:"nowrap"}}>{l}</button>)}
      </div>
      <div style={{padding:"14px 16px"}}>

        {tab==="obras"&&<PortfolioObras puedeCrear={rolId==="produccion"}/>}

        {tab==="solicitudes"&&(<>
          {rolId==="compras"&&<div style={{background:"#f5efe0",borderRadius:8,padding:"8px 12px",marginBottom:12,fontSize:12,color:"#7a5c1e"}}>Solo ves: materiales, traslados y urgencias.</div>}
          {rolId==="admin"&&<div style={{background:"#edf1eb",borderRadius:8,padding:"8px 12px",marginBottom:12,fontSize:12,color:C.verde}}>Solo ves: avances de mano de obra y pedidos de materiales.</div>}
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
            <button onClick={()=>setObraFiltro(null)} style={{fontSize:11,padding:"4px 10px",borderRadius:10,border:`1px solid ${!obraFiltro?C.negro:C.grisMedio}`,background:!obraFiltro?C.negro:"transparent",color:!obraFiltro?C.blanco:C.grisTexto,cursor:"pointer"}}>Todas</button>
            {obras.filter(o=>o.estado!=="finalizada").map(o=>{const es=ESTADOS_OBRA[o.estado];return(<button key={o.id} onClick={()=>setObraFiltro(o.id)} style={{fontSize:11,padding:"4px 10px",borderRadius:10,border:`1px solid ${obraFiltro===o.id?es.color:C.grisMedio}`,background:obraFiltro===o.id?es.bg:"transparent",color:obraFiltro===o.id?es.color:C.grisTexto,cursor:"pointer",fontWeight:obraFiltro===o.id?600:400}}>{o.nombre}</button>);})}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
            {[["Total",solVisibles.length,C.pizarra],["Pendientes",solVisibles.filter(s=>s.estado==="Pendiente").length,"#9a6500"],["Aprobadas",solVisibles.filter(s=>s.estado==="Aprobado").length,C.verde]].map(([l,v,c])=>(<div key={l} style={{background:C.grisClaro,borderRadius:8,padding:"10px 12px"}}><div style={{fontSize:10,color:C.grisTexto,textTransform:"uppercase",letterSpacing:.5,marginBottom:2}}>{l}</div><div style={{fontSize:22,fontWeight:600,color:c}}>{v}</div></div>))}
          </div>
          {solVisibles.length===0&&<div style={{fontSize:13,color:C.grisTexto,textAlign:"center",padding:"2rem"}}>Sin solicitudes{obraFiltro?" para esta obra":""}.</div>}
          {solVisibles.map(s=>{const t=TIPOS[s.tipo],ec=EC[s.estado];return(
            <div key={s.id} onClick={()=>{setDetalleId(s.id);setVista("detalle");}} style={{background:C.blanco,border:`1px solid ${C.grisMedio}`,borderRadius:10,padding:"12px 14px",marginBottom:8,cursor:"pointer"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor=C.acento}
              onMouseLeave={e=>e.currentTarget.style.borderColor=C.grisMedio}>
              <div style={{display:"flex",justifyContent:"space-between",gap:6,marginBottom:6,flexWrap:"wrap"}}>
                <div style={{display:"flex",gap:5,flexWrap:"wrap"}}><Pill label={t.label} color={t.color} bg={t.bg}/><ObraChip id={s.obra} obras={obras}/></div>
                <Pill label={s.estado} color={ec.color} bg={ec.bg}/>
              </div>
              <div style={{fontSize:14,fontWeight:500,marginBottom:4,lineHeight:1.3}}>{s.titulo}</div>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <span style={{fontSize:11,color:C.grisTexto}}>{s.rubro}</span>
                <span style={{fontSize:11,color:C.grisTexto}}>{s.fecha}{s.comentarios.length>0?` · ${s.comentarios.length} coment.`:""}</span>
              </div>
              {rolId==="compras"&&!s.remito&&<div style={{fontSize:11,color:C.acento,marginTop:4}}>Sin remito cargado</div>}
              {rolId==="compras"&&s.remito&&<div style={{fontSize:11,color:C.verde,marginTop:4}}>Remito: {s.remito}</div>}
            </div>
          );})}
        </>)}

        {tab==="protocolo"&&(<>
          {obras.filter(o=>o.estado==="lanzamiento").length===0&&<div style={{fontSize:13,color:C.grisTexto,textAlign:"center",padding:"2rem"}}>No hay obras en lanzamiento.</div>}
          {obras.filter(o=>o.estado==="lanzamiento").map(o=>{
            const pct=Math.round(o.protocolo.filter(t=>t.estado==="completado").length/o.protocolo.length*100);
            return(<div key={o.id} style={{border:`1px solid ${C.grisMedio}`,borderRadius:12,padding:"14px",marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:14,fontWeight:600}}>{o.nombre}</span><span style={{fontSize:11,color:pct===100?C.verde:C.acento,fontWeight:600}}>{pct}%</span></div>
              <div style={{height:5,background:C.grisMedio,borderRadius:4,marginBottom:10}}><div style={{height:"100%",width:`${pct}%`,background:pct===100?C.verde:C.acento,borderRadius:4}}/></div>
              {o.protocolo.map(t=>{const rb=ROL_BADGE[t.rol]||{label:t.rol,color:C.grisTexto,bg:C.grisMedio};return(
                <div key={t.id} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:`1px solid ${C.grisMedio}`}}>
                  <div style={{width:14,height:14,borderRadius:"50%",border:`1.5px solid ${t.estado==="completado"?C.verde:C.grisMedio}`,background:t.estado==="completado"?C.verde:"transparent",flexShrink:0}}/>
                  <div style={{flex:1,fontSize:12,color:t.estado==="completado"?C.grisTexto:C.negro,textDecoration:t.estado==="completado"?"line-through":"none"}}>{t.tarea}</div>
                  <Pill label={rb.label} color={rb.color} bg={rb.bg} small/>
                  {t.estado==="pendiente"&&<button onClick={()=>confirmarProto(o.id,t.id)} style={{fontSize:10,padding:"3px 8px",borderRadius:6,border:`1px solid ${C.verde}`,background:"#edf1eb",color:C.verde,cursor:"pointer"}}>✓</button>}
                </div>
              );})}
              {pct===100&&<button onClick={()=>activarObra(o.id)} style={{...btnP,marginTop:12,width:"100%",padding:"9px",background:C.verde}}>Activar obra →</button>}
            </div>);
          })}
        </>)}

        {tab==="docs"&&(<>
          <div style={{background:C.grisClaro,borderRadius:10,padding:"12px",marginBottom:12}}>
            <div style={{marginBottom:8}}><Sec title="Nombre del archivo"/><input value={formDoc.nombre} onChange={e=>setFormDoc(f=>({...f,nombre:e.target.value}))} placeholder="ej: Planos_RevC.pdf" style={inp}/></div>
            <div style={{marginBottom:10}}><Sec title="Tipo"/><select value={formDoc.tipo} onChange={e=>setFormDoc(f=>({...f,tipo:e.target.value}))} style={inp}>{["Planos","Memoria","Especificaciones","Detalle constructivo","Otro"].map(t=><option key={t}>{t}</option>)}</select></div>
            <button onClick={subirDoc} style={btnP}>Cargar documento</button>
          </div>
          {docs.map(d=>(<div key={d.id} style={{border:`1px solid ${C.grisMedio}`,borderRadius:8,padding:"10px 13px",marginBottom:6,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:13,fontWeight:500}}>{d.nombre}</div><div style={{display:"flex",gap:6,marginTop:3}}><span style={{fontSize:11,color:C.grisTexto}}>{d.tipo} · {d.fecha}</span><ObraChip id={d.obra} obras={obras}/></div></div>{d.nuevo&&<Pill label="Nuevo" color={C.celeste} bg="#e4f3f6"/>}</div>))}
        </>)}

        {tab==="computo"&&(<>
          {formPedido&&(
            <div style={{background:C.grisClaro,borderRadius:10,padding:"12px",marginBottom:12}}>
              <div style={{marginBottom:8}}><Sec title="Cantidad"/><input type="number" value={formPedido.cant} onChange={e=>setFormPedido(f=>({...f,cant:e.target.value}))} style={{...inp,width:"auto"}} min={1}/><span style={{fontSize:12,color:C.grisTexto,marginLeft:8}}>{formPedido.unidad}</span></div>
              <div style={{marginBottom:10}}><Sec title="Nomenclatura (editable)"/><input value={formPedido.nomenclatura} onChange={e=>setFormPedido(f=>({...f,nomenclatura:e.target.value}))} style={inp}/></div>
              <div style={{display:"flex",gap:8}}><button onClick={confirmarPedido} style={btnP}>Confirmar pedido</button><button onClick={()=>setFormPedido(null)} style={btnS}>Cancelar</button></div>
            </div>
          )}
          {computo.map(c=>{const pct=c.cantidad>0?Math.round(c.pedido/c.cantidad*100):0;return(
            <div key={c.id} style={{border:`1px solid ${C.grisMedio}`,borderRadius:10,padding:"12px 14px",marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4,marginBottom:6}}><div><div style={{fontSize:13,fontWeight:500}}>{c.descripcion}</div><div style={{fontSize:11,color:C.grisTexto}}>{c.rubro}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:500}}>{c.pedido}/{c.cantidad} {c.unidad}</div><div style={{fontSize:11,color:pct>0?C.verde:C.grisTexto}}>{pct}%</div></div></div>
              <div style={{height:4,background:C.grisMedio,borderRadius:4,marginBottom:6}}><div style={{height:"100%",width:`${pct}%`,background:C.verde,borderRadius:4}}/></div>
              {rolId==="obra"&&<button onClick={()=>setFormPedido({itemId:c.id,rubro:c.rubro,descripcion:c.descripcion,unidad:c.unidad,cantidad:c.cantidad,cant:1,nomenclatura:genPedidoId(c.rubro)})} style={{fontSize:12,padding:"5px 12px",borderRadius:6,border:`1px solid ${C.acento}`,background:"transparent",color:C.acento,cursor:"pointer"}}>Generar pedido parcial</button>}
            </div>
          );})}
        </>)}

        {tab==="presupuesto"&&(<>
          {rolId==="proyecto"&&(
            <div style={{background:C.grisClaro,borderRadius:10,padding:"12px",marginBottom:12}}>
              <div style={{marginBottom:8}}><Sec title="Rubro"/><select value={formPres.rubro} onChange={e=>setFormPres(f=>({...f,rubro:e.target.value}))} style={inp}>{RUBROS.map(r=><option key={r}>{r}</option>)}</select></div>
              <div style={{marginBottom:10}}><Sec title="Monto ($)"/><input type="number" value={formPres.monto} onChange={e=>setFormPres(f=>({...f,monto:e.target.value}))} style={inp}/></div>
              <button onClick={agregarPres} style={btnP}>Agregar</button>
            </div>
          )}
          {rolId!=="proyecto"&&<div style={{background:"#edf1eb",borderRadius:8,padding:"8px 12px",marginBottom:12,fontSize:12,color:C.verde}}>Presupuesto publicado por Proyecto — solo lectura.</div>}
          {presupuesto.filter(p=>rolId==="proyecto"||p.publicado).map((p,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${C.grisMedio}`}}>
              <div><div style={{fontSize:13,fontWeight:500}}>{p.rubro}</div><div style={{display:"flex",gap:6,marginTop:2}}><ObraChip id={p.obra} obras={obras}/>{!p.publicado&&<span style={{fontSize:10,color:C.grisTexto}}>No publicado</span>}</div></div>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <div style={{fontSize:14,fontWeight:600,color:C.pizarra}}>{fmt(p.monto)}</div>
                {rolId==="proyecto"&&<button onClick={()=>togglePres(p.rubro)} style={{fontSize:11,padding:"4px 10px",borderRadius:6,border:`1px solid ${p.publicado?C.verde:C.grisMedio}`,background:p.publicado?"#edf1eb":"transparent",color:p.publicado?C.verde:C.grisTexto,cursor:"pointer"}}>{p.publicado?"Ocultar":"Publicar"}</button>}
              </div>
            </div>
          ))}
        </>)}

        {tab==="buzon"&&rolId==="proyecto"&&(<>
          <div style={{background:C.grisClaro,borderRadius:10,padding:"12px",marginBottom:12}}>
            <div style={{marginBottom:8}}><Sec title="Título del aviso"/><input value={formBuzon.titulo} onChange={e=>setFormBuzon(f=>({...f,titulo:e.target.value}))} placeholder="ej: Actualización planos Rev C" style={inp}/></div>
            <div style={{marginBottom:10}}><Sec title="Detalle"/><textarea value={formBuzon.desc} onChange={e=>setFormBuzon(f=>({...f,desc:e.target.value}))} rows={3} style={{...inp,resize:"vertical"}}/></div>
            <button onClick={publicarBuzon} style={btnP}>Publicar aviso</button>
          </div>
          {buzon.map(b=>(<div key={b.id} style={{border:`1px solid ${C.grisMedio}`,borderRadius:8,padding:"10px 13px",marginBottom:6}}><div style={{display:"flex",justifyContent:"space-between",gap:8,marginBottom:b.desc?4:0}}><div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}><div style={{fontSize:13,fontWeight:500}}>{b.titulo}</div><ObraChip id={b.obra} obras={obras}/></div><Pill label={b.leido?"Leído":"Sin leer"} color={b.leido?C.grisTexto:C.acento} bg={b.leido?C.grisMedio:"#faeae5"}/></div>{b.desc&&<div style={{fontSize:12,color:C.grisTexto,lineHeight:1.5}}>{b.desc}</div>}</div>))}
        </>)}

      </div>
    </div>
  );
}