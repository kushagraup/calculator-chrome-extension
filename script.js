const RESET=0X0000;
const ADDITION=0X0001;
const SUBSTRUCTION=0X0010;
const MULTIPLICATION=0X0100;
const DIVISION=0X1000;
const ZERO=0X22;
var memory=0.0;
var memory_status=ZERO;
var calc_num_status=ZERO;
var status=RESET;
var display_number=0.0;
var calc_num=document.getElementById("calc_num");
var calc_info=document.getElementById("calc_info");
var new_num=true;
var calc_A=0;
const A=0xA;
const B=0xB;
var calc_B=0;
var AorB=A;
function set_display_number(number)
{
	var num_str_arr=String(number).split(".");
	var text="";
	var symbol_arr=num_str_arr[0].split("");
	for(var i=(symbol_arr.length-1); i>=0; i--)
	{
		if(i==0)text=symbol_arr[i]+text;
		else{
			if((symbol_arr.length-i)%3==0) text="'"+symbol_arr[i]+text;
			else text=symbol_arr[i]+text;
		}
	}
	if(num_str_arr.length==2)text+="."+num_str_arr[1];
	text=text.replace("-'", "-");
	calc_num.innerText=text;
}
function digit_add(digit)
{
	if(new_num){
		display_number=0;
		set_display_number(display_number);
		new_num=false;
	}
	var text=calc_num.innerText;
	text=text.replace(/'/g, "");
	text+=digit;
	display_number=parseFloat(text);
	set_display_number(display_number);
}
set_display_number(0);
var m0=document.getElementsByTagName("td")[0];
m0.onclick=function(){
	memory-=display_number;
	calc_info.innerText="M="+String(memory);
};
var m1=document.getElementsByTagName("td")[1];
m1.onclick=function(){
memory+=display_number;
calc_info.innerText="M="+String(memory);
};
var pc=document.getElementsByTagName("td")[2];
pc.onclick=function(){
	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
if(status!=RESET){
	if (AorB==A) {
		if(status==ADDITION){
			display_number=calc_B+(display_number*(calc_B/100));
			set_display_number(display_number);
		}
		if(status==SUBSTRUCTION){
			display_number=calc_B-(display_number*(calc_B/100));
			set_display_number(display_number);
		}
		if(status==MULTIPLICATION){
			display_number=(display_number*(calc_B/100));
			set_display_number(display_number);
		}
		if(status==DIVISION){
			display_number=(display_number/(calc_B/100));
			set_display_number(display_number);
		}
	}else{
		if(status==ADDITION){
			display_number=calc_A+(display_number*(calc_A/100));
			set_display_number(display_number);
		}
		if(status==SUBSTRUCTION){
			display_number=calc_A-(display_number*(calc_A/100));
			set_display_number(display_number);
		}
		if(status==MULTIPLICATION){
			display_number=(display_number*(calc_A/100));
			set_display_number(display_number);
		}
		if(status==DIVISION){
			display_number=(display_number/(calc_A/100));
			set_display_number(display_number);
		}
	}
	AorB=A;
	status=RESET;
}
//%%%%%
};
var sq=document.getElementsByTagName("td")[3];
sq.onclick=function(){
	var text=calc_num.innerText;
	text=text.replace(/'/g, "");
	display_number=parseFloat(text);
	display_number=Math.sqrt(display_number);
	set_display_number(display_number);
};
var dv=document.getElementsByTagName("td")[4];
dv.onclick=function(){
	if(AorB==A){
		if(status==SUBSTRUCTION)m.click();
		if(status==MULTIPLICATION)mul.click();
		if(status==ADDITION)p.click();
		console.log("A");
		if(status==RESET)calc_A=display_number;
		else if(status==DIVISION && !new_num)
		{
			calc_A=calc_B/display_number;
			display_number=calc_A;
			set_display_number(display_number);
		}
		if(!new_num)AorB=B;
		new_num=true;
		status=DIVISION;
	}
	else{
		console.log("B");
		if(status==SUBSTRUCTION)m.click();
		if(status==MULTIPLICATION)mul.click();
		if(status==ADDITION)p.click();
		if(status==DIVISION && !new_num)
		{
			calc_B=calc_A/display_number;
			display_number=calc_B;
			set_display_number(calc_B);
		}
		if(!new_num)AorB=A;
		new_num=true;
		status=DIVISION;
	}
};
var MR=document.getElementsByTagName("td")[5];
MR.onclick=function(){
	display_number=memory;
	set_display_number(display_number);
};
var b7=document.getElementsByTagName("td")[6];
b7.onclick=function(){digit_add("7");};
var b8=document.getElementsByTagName("td")[7];
b8.onclick=function(){digit_add("8");};
var b9=document.getElementsByTagName("td")[8];
b9.onclick=function(){digit_add("9");};
var mul=document.getElementsByTagName("td")[9];
mul.onclick=function(){
//***********************************
	if(AorB==A){
		if(status==SUBSTRUCTION)m.click();
		if(status==ADDITION)p.click();
		if(status==DIVISION)dv.click();
		console.log("A");
		if(status==RESET)calc_A=display_number;
		else if(status==MULTIPLICATION && !new_num)
		{
			calc_A=calc_B*display_number;
			display_number=calc_A;
			set_display_number(display_number);
		}
		if(!new_num)AorB=B;
		new_num=true;
		status=MULTIPLICATION;
	}
	else{
		console.log("B");
		if(status==SUBSTRUCTION)m.click();
		if(status==ADDITION)p.click();
		if(status==DIVISION)dv.click();
		if(status==MULTIPLICATION && !new_num)
		{
			calc_B=calc_A*display_number;
			display_number=calc_B;
			set_display_number(calc_B);
		}
		if(!new_num)AorB=A;
		new_num=true;
		status=MULTIPLICATION;
	}
};
var eraser=document.getElementsByTagName("td")[10];
eraser.onclick=function(){
	var text=calc_num.innerText;
	text=text.replace(/'/g, "");
	if(text.length==1){
		set_display_number(0);
		return;
	}
	text=text.substring(0, text.length - 1);
	display_number=parseFloat(text);
	set_display_number(display_number);
};
var b4=document.getElementsByTagName("td")[11];
b4.onclick=function(){digit_add("4");};
var b5=document.getElementsByTagName("td")[12];
b5.onclick=function(){digit_add("5");};
var b6=document.getElementsByTagName("td")[13];
b6.onclick=function(){digit_add("6");};
var m=document.getElementsByTagName("td")[14];
m.onclick=function(){
	//- - - - - - - - - - - - - -
	if(AorB==A){
		if(status==MULTIPLICATION)mul.click();
		if(status==ADDITION)p.click();
		if(status==DIVISION)dv.click();
		console.log("A");
		if(status==RESET)calc_A=display_number;
		else if(status==SUBSTRUCTION && !new_num)
		{
			calc_A=calc_B-display_number;
			display_number=calc_A;
			set_display_number(display_number);
		}
		if(!new_num)AorB=B;
		new_num=true;
		status=SUBSTRUCTION;
	}
	else{
		console.log("B");
		if(status==MULTIPLICATION)mul.click();
		if(status==ADDITION)p.click();
		if(status==DIVISION)dv.click();
		if(status==SUBSTRUCTION && !new_num)
		{
			calc_B=calc_A-display_number;
			display_number=calc_B;
			set_display_number(calc_B);
		}
		if(!new_num)AorB=A;
		new_num=true;
		status=SUBSTRUCTION;
	}
};
var pm=document.getElementsByTagName("td")[15];
pm.onclick=function(){
	display_number*=-1;
	set_display_number(display_number);
};
var b1=document.getElementsByTagName("td")[16];
b1.onclick=function(){digit_add("1");};
var b2=document.getElementsByTagName("td")[17];
b2.onclick=function(){digit_add("2");};
var b3=document.getElementsByTagName("td")[18];
b3.onclick=function(){digit_add("3");};
var p=document.getElementsByTagName("td")[19];
p.onclick=function(){
	//++++++
	if(AorB==A){
		if(status==DIVISION)dv.click();
		if(status==MULTIPLICATION)mul.click();
		if(status==SUBSTRUCTION)m.click();
		console.log("A");
		if(status==RESET)calc_A=display_number;
		else if(status==ADDITION && !new_num)
		{
			calc_A=display_number+calc_B;
			display_number=calc_A;
			set_display_number(display_number);
		}
		if(!new_num)AorB=B;
		new_num=true;
		status=ADDITION;
	}
	else{
		if(status==DIVISION)dv.click();
		if(status==MULTIPLICATION)mul.click();
		if(status==SUBSTRUCTION)m.click();
		console.log("B");
		if(status==ADDITION && !new_num)
		{
			calc_B=display_number+calc_A;
			display_number=calc_B;
			set_display_number(calc_B);
		}
		if(!new_num)AorB=A;
		new_num=true;
		status=ADDITION;
	}
};
var ce=document.getElementsByTagName("td")[20];
ce.onclick=function(){
status=RESET;
calc_A=0;
calc_B=0;
AorB=A;
display_number=0.0;
set_display_number(display_number);
};
var b0=document.getElementsByTagName("td")[21];
b0.onclick=function(){digit_add(0);};
var b00=document.getElementsByTagName("td")[22];
b00.onclick=function(){digit_add(0); digit_add(0);};
var dot=document.getElementsByTagName("td")[23];
dot.onclick=function(){
	if(calc_num.innerText.indexOf(".")==-1)calc_num.innerText+=".";
};
function eq(){
	if(status==DIVISION)m.click();
	if(status==ADDITION)p.click();
	if(status==SUBSTRUCTION)m.click();
	if(status==MULTIPLICATION)mul.click();
	status=RESET;
	calc_A=0;
	calc_B=0;
	AorB=A;
}
var eq_=document.getElementsByTagName("td")[24];
eq_.onclick=function(){eq();};