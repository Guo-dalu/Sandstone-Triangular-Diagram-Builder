/*
 * Sandstone Triangular Diagram Builder
 * 
 * It's a light-weighted, user-friendly tool for drawing sandstone triangular diagram. 
 * Using native javascript language completely, this tool is available on offine environment
 * Please feel free to use, and you may add some new functions based on it.
 * It's my first front-end work, hope you like it! 
 * here is my blog addresss :
 * http://blog.csdn.net/github_36487770
 */
var diagram=document.getElementById("diagram");
if (!diagram.getContext) {alert("您的浏览器不支持画布功能,请换用高版本的浏览器");}
else {
var diatx=diagram.getContext("2d");
var a=150;  //a 为三角图边长的一半
var b=a/2;
var c=b/2;
var sss=Math.sqrt(3);  //sss=根号3
var trih=a*sss;    //trih为三角图的高
var canwid=diagram.width;  //定义画布的长宽便于调节
var canhet=diagram.height;
var drawoutline=function(){
diatx.save();
diatx.clearRect(0,0,canwid,canhet);
diatx.translate(canwid/2,canhet-a/4); //原点设在三角形底边中点处
diatx.lineWidth=3; //三角形用粗线
diatx.strokeStyle="black";
diatx.save();
diatx.lineWidth=1; 
diatx.strokeStyle="grey" ;
diatx.beginPath();        //三角图内部辅助边9条
diatx.moveTo(3*c,-c*sss);//右下方向的三条
diatx.lineTo(b,0);
diatx.moveTo(b,-b*sss);
diatx.lineTo(0,0);
diatx.moveTo(c,sss*c-sss*a);
diatx.lineTo(-b,0);
diatx.moveTo(-3*c,-c*sss);//左下方向的三条
diatx.lineTo(-b,0);
diatx.moveTo(-b,-b*sss);
diatx.lineTo(0,0);
diatx.moveTo(-c,sss*c-sss*a);
diatx.lineTo(b,0); 
diatx.moveTo(-3*c,-c*sss);//横向三条
diatx.lineTo(3*c,-c*sss);
diatx.moveTo(-b,-b*sss);
diatx.lineTo(b,-b*sss);
diatx.moveTo(-c,sss*c-sss*a);
diatx.lineTo(c,sss*c-sss*a);
diatx.stroke();
diatx.beginPath();  //三角形边框
diatx.moveTo(a, 0);  
diatx.lineTo(0,-trih);//纵向相反了，向上为负，横向右正左负
diatx.lineTo(-a,0);
diatx.lineTo(a,0);
diatx.restore();
diatx.stroke();
diatx.font="bold 18px Arial";
diatx.textAlign="start";
diatx.textBaseline="middle";
diatx.fillText("石英(100%)",-18,-a*sss-18);
diatx.fillText("长石(100%)",-a-36,18);
diatx.fillText("岩屑(100%)",a-36,18);
diatx.restore();
};

/* 如果浏览器支持html5画布，那它也应当支持addEventListener*/  
/*var eventUtil={
	addHandler:function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}
		else if (element.attachEvent) {
			element.attachEvent("on"+type,handler);
		}
		else {element["on"+type]=handler};
	},
	removeHandler:function(element,type,handler){
		if (element.addEventListener) {
			element.addEventListener(type,handler,false);
		}
		else if (element.attachEvent) {
			element.attachEvent("on"+type,handler);
		}
		else {element["on"+type]=handler};
	}
};*/
function getElementsByClassName(className,context){
        context = context || document;       //如果有指定从某个元素里寻找，则会比每次都遍历document快得多
         
        if(context.getElementsByClassName){                               //如果浏览器支持原生的方法，则直接用原生的方法，为什么？你有把握你写的方法比原生提供的好吗？
            return context.getElementsByClassName(className);
        }
         
        var nodes = context.getElementsByTagName('*');         //遍历
        var rets = [];                                                     //存放匹配到的节点
        for(var i = 0; i < nodes.length; i++){
            if(hasClass(className,nodes[i])){                      //hasClass派上用场了
                rets.push(nodes[i]);
            }
        }
         i=0;
        return rets;
}
var btn=document.getElementById("displaybtn");
var stonePercents=document.getElementsByClassName("stonename");
var inputs=document.getElementsByTagName("input");
var warns=document.getElementsByClassName("warn");
var temp1=[],temp2=[];
var values=[];


// validation
// typeof data: number
// each number is largerer than 0, and the sum should be less than 100
//validation for positivity and number type

var lineinputvalid=function(){ 
for(var i = 0; i<inputs.length; i++){
	inputs[i].addEventListener("focus",function(event){
		this.style.fontSize="16px";
	},false);
	inputs[i].addEventListener("blur",function(event){
		if (!inputs[i].value) { warns[i].innerText="请输入数字";}
		else{
		temp1=inputs[i].value.trim().split(" ");
		for(var ll=0;ll<temp1.length;ll++){
			if (temp1[ll]!==""||temp1[ll]==="0") {temp2.push(temp1[ll]);}
		}
		ll=0;		
		temp2.forEach( function(element){
		if (Number(element)===NaN) {warns[i].innerText="请输入数字，数字不能为负数";}
		else if (+(element) < 0||+(element)>100) {warns[i].innerText="百分数不应超过100";}
		else {warns[i].innerText="";}
		})}
	},false);} i=0;
};

var stonetotaldata=[],stonesingledata=[];
var x,p,v; 
var qsnum=0,fsnum=0,rsnum=0;
var stonetype="";
var dx,dy,scale=a*sss/100;   //put the location of single point in global window
var showsingle=function(array){
var containssum=array[0]+array[1]+array[2];
var qs=100*array[0]/containssum,rs=100*array[2]/containssum;
	diatx.save();
	diatx.translate(canwid/2,canhet-a/4); 
	diatx.fillStyle="blue";
	diatx.strokeStyle="yellow";   //待用，以后可以调整矩形的颜色
	diatx.save();
	diatx.fillStyle="red";
	diatx.strokeStyle="blue";
	dx=rs+qs/2,dy=qs;	
	diatx.fillRect((dx-50)*a/50-5,-dy*scale-5,10,10);
	diatx.strokeRect((dx-50)*a/50-5,-dy*scale-5,10,10);
	diatx.restore();
	diatx.restore();  //对应待用的颜色
};
var countsingle=function(array){
stonetype="";
var containssum=array[0]+array[1]+array[2];
var qs=100*array[0]/containssum,fs=100*array[1]/containssum,rs=100*array[2]/containssum;
console.log(containssum);
if (rs<25) {
	if (fs>25) {stonetype="fstone";}
	else {stonetype="qstone";}
}
else{
	if (fs<25) {stonetype="rstone";}
	else {if (fs>rs) {stonetype="fstone";}
		else stonetype="rstone";}
} 
};//end of countsingle	
var lineinput=document.getElementById("lineinput");	
var txtinput=document.getElementById("txtinput");
var showarea=document.getElementById("showarea");
var dataarea=document.getElementById("dataarea");
var resizebtn= document.getElementById("resizebtn");
var resizedataarea=function(){ resizebtn.addEventListener("click",function(){dataarea.innerText="";},false);}; 
var dataareavalid=function(){
	dataarea.addEventListener("blur",function(event){
		temp1=[];temp2=[];
		temp1=dataarea.value.trim().split(" ");
		for(var ll=0;ll<temp1.length;ll++){
			if (temp1[ll]!=="") {temp2.push(temp1[ll]);}
		}		
			ll=0;
		temp2.forEach( function(element){
		if (Number(element)===NaN) {warns["txtwarn"].innerText="请输入数字，数字不能为负数";}
		else if (+(element)>100) {warns["txtwarn"].innerText="百分数不应超过100";}
		else {warns["txtwarn"].innerText="";}
	})},false); };
	  //validation onblur
var showall=function (event){
	drawoutline();
	samplenum.innerText="";
	for (var pl = 0; pl < stonePercents.length; pl++) {
		stonePercents[pl].innerText="";
	}
	pl=0;
	for (var j = 0; j<inputs.length; j++)	
	{	temp1=[];values[j]=[];
		temp1=inputs[j].value.toString().trim().split(" ");
		for(var ll=0;ll<temp1.length;ll++){
			if (temp1[ll]!=="") {values[j].push(temp1[ll]);}
		}	
		ll=0;	
	for(x in values[j]){values[j][x]=+(values[j][x]);}
	} 
j=0;//values[0]==石英含量的数组
//validation for buttun ,stonetotaldata%3==stonesingledata ,and sum of sinledata should less than 100
if (!(values[0][0]>=0&&values[1][0]>=0&&values[2][0]>=0)) {warns[4].innerText="请在每一行输入数据";return;}
else if (values[0].concat(values[1],values[2]).length%3!==0) {warns[4].innerText="请输入三个一组的成组数据";return;}//每一组3个数据 
else{warns[4].innerText="";
var flag=0;
 for(var y = 0; y<values[0].length; y++)
    {   stonesingledata[y]=[];
		stonesingledata[y].push(values[0][y],values[1][y],values[2][y]);
	    stonesingledata[y].sum=values[0][y]+values[1][y]+values[2][y];	    
	if (stonesingledata[y].sum>100) {warns[4].innerText+="第"+(y+1)+"组数据之和超过100\n";flag=1;return;}
	} 
y=0;	
var m=0,l=0;	
	if (flag===0)
  	{warns[4].innerText="";qsnum=0;rsnum=0;fsnum=0;
	for(var l=0;l<values[0].concat(values[1],values[2]).length/3;l++)
	{   		
		showsingle(stonesingledata[l]);
		countsingle(stonesingledata[l]);		
		switch (stonetype){
			case "qstone": qsnum++;break;
			case "fstone": fsnum++;break;
			case "rstone": rsnum++;break;
			default:  break;	
			}	
	explaincount();}	
	l=0;
	}	
}	
};//end of showall function

var showallfromtxtarea =function (event){	
	drawoutline();	
	warns[4].innerText="";
	for (var pl = 0; pl < stonePercents.length; pl++) {
		stonePercents[pl].innerText="";
	}
	pl=0;
	stonetotaldata=[];
	var flag=0;
	temp1=[];temp2=[];
	temp1=dataarea.value.trim().split(" ");
		for(var ll=0;ll<temp1.length;ll++){
			if (temp1[ll]!==""&&typeof(+temp1[ll].trim())==="number") {temp2.push(temp1[ll].trim())};
		}	
		ll=0;
	console.log("temp2 after push: "+temp2);				
	if (temp2.length%3!==0||temp2.length===0){warns[4].innerText="请输入三个一组的成组数据";flag=1;}
	else{warns[4].innerText="";
		stonetotaldata=temp2;
		for(v in stonetotaldata){stonetotaldata[v]=+(stonetotaldata[v]);}
	for(var y=0,h=0;y<stonetotaldata.length/3;y++,h++)
	{   stonesingledata[y]=[];
		stonesingledata[y].push(stonetotaldata[y+2*h],stonetotaldata[y+2*h+1],stonetotaldata[y+2*h+2]);
	    stonesingledata[y].sum=stonetotaldata[y+2*h]+stonetotaldata[y+1+2*h]+stonetotaldata[y+2+2*h];
	    if (stonesingledata[y].sum>100) {warns[4].innerText+="第"+(y+1)+"组数据之和超过100\n";flag=1;}
	}
	y=0;
	h=0;	
	if (flag===0){
		warns[4].innerText="";
		qsnum=0;
		fsnum=0;
		rsnum=0;
		for(var p=0;p<stonetotaldata.length/3;p++){			
		showsingle(stonesingledata[p]);
		countsingle(stonesingledata[p]);		
		switch (stonetype)
		{
			case "qstone": qsnum++; break;
			case "fstone": fsnum++;break;
			case "rstone": rsnum++;break;
			default:break;
		}
		explaincount();
		}
	p=0;
	}//end of flag===0
}
};	//end of showallfromtxtarea
var samplenum=document.getElementById("samplenum");
var explaincount=function(){
	for (var pl = 0; pl < stonePercents.length; pl++) {
		stonePercents[pl].innerText="";
	}
	pl=0;
	if (warns[4].innerText===""){
	var totalnum=qsnum+fsnum+rsnum;
	samplenum.innerText="共有"+totalnum+"个样本";
	var qspercent=100*(qsnum/totalnum);fspercent=100*fsnum/totalnum;rspercent=100*rsnum/totalnum;
	if (qspercent||fspercent||rspercent) {
	stonePercents[0].innerText=qspercent.toFixed(2)+"%为石英砂岩";
	stonePercents[1].innerText=fspercent.toFixed(2)+"%为长石砂岩";
	stonePercents[2].innerText=rspercent.toFixed(2)+"%为岩屑砂岩";}
	}
};
// main function

drawoutline();
btn.addEventListener("click",drawoutline(),false);
showarea.addEventListener("click",function(){
	showarea.style.visibility="hidden";
	drawoutline();
	samplenum.innerText="";
	for (var pl = 0; pl < stonePercents.length; pl++) {
		stonePercents[pl].innerText="";
	}
	pl=0;
	txtinput.style.visibility="visible";lineinput.style.visibility="hidden";
	resizedataarea();
	dataareavalid();
	btn.addEventListener("click",showallfromtxtarea,false); 
},false);
if(txtinput.style.visibility==="hidden"||txtinput.style.visibility===""||txtinput.style.visibility===null) 
	{	lineinputvalid();
		btn.addEventListener("click",showall,false);	
	}
else {	showarea.click();}
}//end of global else