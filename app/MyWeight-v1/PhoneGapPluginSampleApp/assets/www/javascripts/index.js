/*
 * Copyright 2011 Ericsson Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
var swipecheck=0;
var typedtext;
var arr=new Array();
var isreply=0;
var readings=new Array();
var ylabel=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
ListDemo = new Ext.Application({
    name: "ListDemo",

    launch: function() {

        ListDemo.detailPanel = new Ext.Panel({
            fullscreen: true,
			id: 'detailpanel',
			scroll:'vertical',
			//layout: 'fit',
			style:"background-color:#e1e9e3;",
			items:[
				{
				/*	dock:"top",
					xtype:'toolbar',
					layout:'hbox',
					ui:'blue',
					height:40,
					style: "background: url('img/topbg.png')" ,
					items:[
					{
					
						xtype:'textfield',
						name:'myField',
						placeHolder:"What's Up",
						width:'78%',
						height:40,
						align:'left',
						id:'texty',
						listeners:
						{
							change:function()
							{
								typedtext=Ext.getCmp('texty').getValue();
							},
							scope:this,
							blur:function()
							{
								Ext.getCmp('texty').setValue('');
							},
							scope:this
						}
					
					},
					{
						xtype:'button',
						ui:'purple',
						label:"Post",
						name:'myField',
						height: '30',
	        			width: '20%',
						text:"Post"	,
						handler: postbuttonclick								        
	       				
								
					}]*/}
				],
            html: '<form><div id="postouter"></div></form><div id="body"></div>',
			dockedItems:[{
				xtype:"toolbar",
				ui:'orange',
				title:"MyWeight",
				layout:'hbox',
				defaults:{xtype:'button'},
				items:[
					{
						text:'Exit',ui:'blue-round',handler:exitevent
					},
					{xtype:'spacer'},
					{
						text:'Reset',ui:'blue-round',handler:clearevent
					},
				]
				},
				{
				dock:"top",
					xtype:'toolbar',
					layout:'hbox',
					ui:'blue',
					height:40,
					style: "background-color:white;" ,
					items:[
					{
					
						xtype:'textfield',
						name:'myField',
						placeHolder:"What's Up",
						width:'78%',
						height:40,
						align:'left',
						id:'texty',
						listeners:
						{
							change:function()
							{
								typedtext=Ext.getCmp('texty').getValue();
							},
							scope:this,
							blur:function()
							{
								Ext.getCmp('texty').setValue('');
								//Ext.currentlyFocusedField=false;
							},
							scope:this/*,
							focus:function()
							{
								Ext.getCmp('texty').setValue('');
								Ext.currentlyFocusedField=true;
							},
							scope:this*/
						}
					
					},
					{
						xtype:'button',
						ui:'purple',
						label:"Post",
						name:'myField',
						height: '30',
	        			width: '20%',
						text:"Post"	,
						handler: postbuttonclick								        
	       				
								
					}]
				}
				]
        });
        ListDemo.listPanel = new Ext.Panel({
			fullscreen: true,
			id: 'disclosurelist',
            html: '<div class="bgimage"><img src="img/bg.png" onload="loadfunction()"/></div>',
            onItemDisclosure: function(record, btn, index) {
                ListDemo.detailPanel.update(record.data);
                ListDemo.Viewport.setActiveItem('detailpanel');
            } 
        });

        ListDemo.Viewport = new Ext.Panel ({
            fullscreen: true,
            layout: 'card',
            cardSwitchAnimation: 'slide',
            items: [ListDemo.listPanel, ListDemo.detailPanel]
        });

    }
});
var postcounter=2;
var a=1,b=1,c=1;


function clearevent()
{
	location.reload(true);
	/*window.scroll(0,0);
	var postcounter=2;
	a=1,b=1,c=1;
	document.getElementById("body").innerHTML="";
	loadfunction();
*/
}
function postbuttonclick()
{
	//typedtext=Ext.getCmp('texty').getValue();	
	window.Keyboard.hideKeyboard();
	ListDemo.detailPanel.scroll="vertical";
	var c1=5;
	if (isreply==1)
		{
			c1=c;
			isreply=0;
		}
	postcomment(a,b,c1,typedtext);
	Ext.getCmp('texty').blur();
}
function postcomment(userid,typeid,attachid,typedtext1)
{
	//document.getElementById("postouter").innerHTML='<div id="postbutton" onClick="postcomment(1,1,1)"><p>Post</p></div>';
	if (userid==1)
	{
		typedtext=Ext.getCmp('texty').getValue();
	}
	if(attachid==1)
		{	
			var postid="body";
		}
		else postid="post"+attachid.toString()+"child";
	var temphtml=document.getElementById(postid).innerHTML;
	var imgtag;
	if(btnclick==1)
	{
		typedtext="Take My Weight";
		btnclick=0;
	}
	if(btnclick==2)
	{
		typedtext="My Trend";
		btnclick=0;
	}
	if(btnclick==3)
	{
		typedtext="Yes, please connect me to AT&T mHealth.";
		btnclick=0;
	}
	var commenttext=typedtext ;
	var newdiv=document.createElement("div");
	newdiv.id="post"+postcounter;
	switch(typeid)
	{
		case 1:	//primary post
		{
			switch(userid)
			{
				case 1:
				{
					imgtag='<img src="img/userpic.png" />';
					newdiv.innerHTML=imgtag+'<div class="rightside"><div class="rightsidetext">'+commenttext+'</div><div class="timestamp">'+timestampnow()+'</div><div class="rightsidebottom"></div></div>';
					newdiv.className="primarypost";
					
				}break;
				case 2:
				{
					imgtag='<img src="img/applogo.png" />';
					newdiv.innerHTML=imgtag+'<div class="rightside"><div class="rightsidetext">'+commenttext+'</div><div class="timestamp">'+timestampnow()+'</div><div class="rightsidebottom"><img src="img/replybutton.png" onClick="replypost('+postcounter+')" /></div></div>';
					newdiv.className="primarypost";
				}break;
			}
			
		}break;
		case 2:	//reply post
		{
			switch(userid)
			{
				case 1:
				{
					imgtag='<img src="img/userpic.png" />';
					newdiv.innerHTML=imgtag+'<div class="rightside"><div class="rightsidetext">'+commenttext+'</div><div class="timestamp">'+timestampnow()+'</div><div class="rightsidebottom"></div></div>';
					newdiv.className="replypost";
					
				}break;
				case 2:
				{
					imgtag='<img src="img/applogo.png" />';
					newdiv.innerHTML=imgtag+'<div class="rightside"><div class="rightsidetext">'+commenttext+'</div><div class="timestamp">'+timestampnow()+'</div><div class="rightsidebottom"><img src="img/replybutton.png" onClick="replypost('+postcounter+')" /></div></div>';
					newdiv.className="replypost";
				}break;
				case 3:
				{
					imgtag='<img src="img/weightscale.png" />';
					newdiv.innerHTML=imgtag+'<div class="rightside"><div class="rightsidetext">'+commenttext+'</div><div class="timestamp">'+timestampnow()+'</div><div class="rightsidebottom"><img src="img/replybutton.png" onClick="replypost('+postcounter+')" /></div></div>';
					newdiv.className="replypost";
				}break;
				case 4:
				{
					imgtag='<img src="img/weightscale.png" />';
					newdiv.innerHTML=imgtag+'<div class="rightside"><div class="rightsidetext">'+commenttext+'</div><div class="timestamp">'+timestampnow()+'</div></div>';
					newdiv.className="replypost";
				}break;
				case 5:
				{
					imgtag='<img src="img/applogo.png" />';
					newdiv.innerHTML=imgtag+'<div class="rightside"><div class="rightsidetext">'+commenttext+'</div><div class="timestamp">'+timestampnow()+'</div></div>';
					newdiv.className="replypost";
				}break;
				case 6:
				{
					imgtag='<img src="img/weightscale.png" />';
					newdiv.innerHTML=imgtag+'<div class="rightside"><div class="rightsidetext">'+commenttext+'</div><div class="timestamp">'+timestampnow()+'</div><div class="rightsidebottom"><img src="img/connectbtn.png" onClick="connectmhealth('+postcounter+')" /></div></div>';
					newdiv.className="replypost";
				}break;
				case 7:
					{
						imgtag='<img src="img/weightscale.png" />';
						newdiv.innerHTML=imgtag+'<div class="rightside"><div class="rightsidetext">'+commenttext+'</div><div class="timestamp">'+timestampnow()+'</div><div class="rightsidebottom"><img src="img/replybutton.png" onClick="replypost('+postcounter+')" /><img src="img/mytrend1.png" onClick="nopost1('+postcounter+')" /></div></div>';
						newdiv.className="replypost";
					}break;
			
				
			}
		}break;
		case 3:
		{
			postid="post"+attachid.toString()+"msg";
			switch(userid)
			{
				 
				case 1:
				{
					newdiv.innerHTML='<div class="msgmsg"><img src="img/msgpic1.png" /><p>Use this button to let your weight scale weigh you</p></div><div class="msgmsg"><img src="img/msgpic2.png" /><p>Use this button to view your weight changes</p></div><div class="msgmsg"><img src="img/msgpic3.png" /><p>Use the text box or the REPLY button to talk to the app</p></div>';
					newdiv.className="msgreply";
				}break;
				case 2:
				{
					newdiv.innerHTML=htmlscript;
					newdiv.className="msgreply1";
				}break;
			}
		}break;
		case 4:
		{
			imgtag='<img src="img/applogo.png" />';
					newdiv.innerHTML=imgtag+'<div class="rightside"><div class="rightsidetext">'+commenttext+'</div><div class="rightsidebottom"><img src="img/replybutton.png" onClick="replypost('+postcounter+')" /><img src="img/mytrend1.png" onClick="nopost('+postcounter+')" /><img src="img/takeweight1.png" onClick="yespost('+postcounter+')" /></div></div>';
					newdiv.className="primarypost";
		}break;
		}
			var childdiv=document.createElement("div");
			childdiv.id="post"+postcounter+"child";
			childdiv.className="replycomment";
			var msgchild=document.createElement("div");
			msgchild.id="post"+postcounter+"msg";
			msgchild.className="replycomment";
			document.getElementById(postid).innerHTML=null;			
			document.getElementById(postid).appendChild(newdiv);
			document.getElementById(postid).appendChild(msgchild);
			document.getElementById(postid).appendChild(childdiv);
			if (deletepast==0) 
			{
				if(postdown==0)
				{
					document.getElementById(postid).innerHTML+=temphtml;
				}
				else 
				{
					document.getElementById(postid).innerHTML=temphtml+document.getElementById(postid).innerHTML;
					postdown=0;
				}
			}
			else deletepast=0;
		postcounter++;
		a=1;b=1;c=1;
		Ext.getCmp('texty').blur();
		if(userid==1)
		{analyzereply(attachid,postcounter-1,typedtext,userid,typeid);}
		return postcounter-1;
}
var deletepast=0;
var postdown=0;
var htmlscript;
var tempchildid;
var tempwhtml;

function exitevent()
{
	window.plugins.AntPlus.destroy(destroySuccess, destroyFailure);
	navigator.app.exitApp();
}
function analyzereply(id,childid,text,userid,typeid)
{
	var invalid=0;
	if(text.toUpperCase().indexOf("MEASURE MY WEIGHT") != -1 || text.toUpperCase().indexOf("TAKE MY WEIGHT") != -1)
	{
		text="Yes";
		arr.push(id);
		invalid=1;
	}
	if(text.toUpperCase().indexOf("MY TREND") != -1 || text.toUpperCase().indexOf("MY WEIGHT TREND") != -1)
	{
		if(readings.length>0)
		{
			typedtext="Here is your weight trend:";
			var tempid=postcomment(2,2,childid,typedtext);
			postdown=1;
			htmlscript=getchart();
			postcomment(2,3,tempid,"");
			invalid=1;
		}
		else
		{
			typedtext="Sorry, but there is no measurement yet.";
			var tempid=postcomment(2,2,childid,typedtext);
			invalid=1;
		}
	}
	for(var i=0;i<arr.length;i++)
	{
		if (id==arr[i])
		{
			switch(text)
			{
				case "Yes":case "yes":case "sure":case "Sure":case "Yup":case "yup":case "ya":case "Ya":
				{
					arr.pop(i);
					typedtext="Waking up... Please wait.";
					postcomment(4,2,childid,typedtext);
					tempchildid=childid;
					window.plugins.AntPlus.pair(WEIGHT_SCALE, pairsuccess, pairfail);
					invalid=1;
					
				}break;
				case "No":case "no":case "not now":case "Naah":case "naah":case "nope":case "Nope": 
				{
					typedtext="OK, no problem. Maybe sometime later :)";
					postcomment(2,2,childid,typedtext);
					invalid=1;
				}break;
			}
		}
	}
	if(text.toUpperCase().indexOf("HI") != -1 || text.toUpperCase().indexOf("HELLO") != -1) {
		typedtext="Hi there!";
		postcomment(2,2,childid,typedtext);
	} else if(text.toUpperCase().indexOf("BYE") != -1 || text.toUpperCase().indexOf("EXIT") != -1 || text.toUpperCase().indexOf("QUIT") != -1) {
		typedtext="See you back soon!";
		postcomment(2,2,childid,typedtext);
		setTimeout("exitevent()",1000);
	} else if(text == "Yes, please connect me to AT&T mHealth.") {
		/*typedtext="Data was uploaded successfully! :)";
		postcomment(2,2,childid,typedtext);*/
	} else if(text.toUpperCase().indexOf("CLEAR") != -1) {
		clearevent();
	} else if(userid==1 && invalid==0 && typeid!=4&& typeid!=3)	{
		typedtext="Sorry, I don't understand what you are saying.";
		postcomment(2,2,childid,typedtext);
	}
}
var checkread=1;
function pairsuccess(p)
{
	////navigator.notification.vibrate(0);
	typedtext="Ready! Step on me once you see my green light on.";
	deletepast=1;
	postcomment(4,2,tempchildid,typedtext);
	checkread=0;
	setTimeout("window.plugins.AntPlus.read(WEIGHT_SCALE, readsuccess, readfail);",1000);
	
/*	while(checkread>0&&checkread<10)
	{
		setTimeout("window.plugins.AntPlus.read(WEIGHT_SCALE, readsuccess, readfail);",1000*checkread++);
	}
	if(checkread!=0)
	{
		readfailure();
	}*/
}
function pairfail(p)
{
	//navigator.notification.vibrate(0);
	deletepast=1;
	if (p == "OFFLINE") {
		typedtext="Oops! Can you place me nearer and try again?";
		postcomment(4,2,tempchildid,typedtext);
	} else if (p == "ERROR") {
		typedtext="Hold on! Please wait till my red light is off and try again.";
		postcomment(4,2,tempchildid,typedtext);
	} else if (p == "ANT") {
		typedtext="Oops! Couldn't talk to your weight scale. Try again?";
		postcomment(2,2,tempchildid,typedtext);
	}
	
}
function readsuccess(weight)
{
	//navigator.notification.beep(1);
	typedtext="Got you! Your weight is " +weight+" lbs.";
	if (readings.length >= 1) {
		lastReading = readings[readings.length - 1][0];
		if (weight == lastReading)
			typedtext = typedtext + " Same as last time.";
		else if (weight > lastReading) {
			gain = weight - lastReading;
			if (gain > 1)
				typedtext = typedtext + " You've gained " + gain + " lbs.";
			else if (gain == 1)
			 	typedtext = typedtext + " You've gained " + gain + " lb.";
		} else if (weight < lastReading) {
			loss = lastReading - weight;
			if (loss > 1)
				typedtext = typedtext + " You've lost " + loss + " lbs.";
			else if (loss == 1)
				typedtext = typedtext + " You've lost " + loss + " lb.";
		}
		
	}
	
	postdown=1;
	postcomment(4,2,tempchildid,typedtext);
	typedtext="Would you like to upload it to AT&T mHealth?";
	postdown=1;
	setTimeout("postcomment(6,2,tempchildid,typedtext);",2000);
	readings.push([weight,currentstamp()]);
	checkread=0;
}
function readfail(p)
{
	if (p == "PAIRED") {
		checkread++;
		if (checkread > 15)
			readfailure();
		else
			setTimeout("window.plugins.AntPlus.read(WEIGHT_SCALE, readsuccess, readfail);",1000);
	} else if (p == "UNPAIRED") {
		typedtext="Oops! Something went wrong. Shall we try again?";
		postdown=1;
		postcomment(3,2,tempchildid,typedtext);
	}
	
}
function currentstamp()
{
	var current=new Date();
	return Math.round(current.getTime()/1000);
}
function readfailure()
{
	//navigator.notification.vibrate(0);
	typedtext="Sorry, but I did not feel you. Did you step on?";
	postdown=1;
	postcomment(3,2,tempchildid,typedtext);
}
function destroySuccess(p)
{
}
function destroyFailure(p)
{
}
function postweightcomment(childid)
{
	postcomment(3,2,childid,typedtext);	
}

function getchart()
{
	if (readings.length==0)return "<p>Sorry, but there is nothing to display</p>";
	var readmax,readmin;
	var readmaxy,readminy;
	var title;
	var chxl1;
	var title="Your Weight Trend";
	readmax=findmax(0);
	readmin=findmin(0);
	readmaxy=findmax(1);
	readminy=findmin(1);
	updateylabel();
	var chf='bg,s,00000000';
	var chxl1="",chxl2,chxp1="",chxp2,chxl,chxp,chd1="",chd2="";
	chxp2=readmin.toString()+",";
	chxl2="|"+(readmin).toString();
	for(var i=0;i<readings.length;i++)
	{
		if(i<=4)
		{
			chxl1+="|"+getdatestring(ylabel[i]);
			chxp1+=(20*(i+1)).toString()+",";
		}
	}
	chxp1=chxp1.slice(0,chxp1.length-1);
	for(var i=1;i<4;i++)
	{
		chxp2+=(Math.round(readmin+i*(readmax-readmin)/4)).toString()+","
		chxl2+="|"+(Math.round((readmin+i*(readmax-readmin)/4))).toString();
	}
	chxp2+=readmax.toString();
	chxl2+="|"+(readmax).toString();
	for(var i=0;i<readings.length;i++)
			{
				chd1+=(100*i/readings.length).toString()+",";
				chd2+=readings[i][0].toString()+",";
			}	
	chd1=chd1.slice(0,chd1.length-1)
	chd2=chd2.slice(0,chd2.length-1);
	chxp="0,"+chxp1+"|1,"+chxp2;
	chxl="0:"+chxl1+"|1:"+chxl2;
	var googleurl="http://chart.apis.google.com/chart?chf="+chf+"&chxl="+chxl+"&chxp="+chxp+"&chxr=0,0,100|1,"+((readmin-(readmax-readmin)/4)).toString()+","+readmax.toString()+"&chxt=x,y&chs=290x170&cht=lxy&chco=3072F3&chds=-5,100,"+(readmin-(readmax-readmin)/4).toString()+","+readmax.toString()+"&chd=t:"+chd1+"|"+chd2+"&chdl="+title+"&chdlp=b&chls=2,4,1&chma=0,0,0,0";

	return '<img src="'+googleurl+'" />';
}
function timestampnow()
{
	var current=new Date();
	var temp;
	if (current.getMinutes()<10) temp="0";
	else temp ="";
	var time=current.getHours()+":"+temp+current.getMinutes();
	return time;
}
function getdatestring(timestamp)
{

	var a = new Date(timestamp*1000);
	var current=new Date();
 	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	if(current.getDate()==a.getDate()&&current.getMonth()==a.getMonth()&&current.getYear()==a.getYear())
	{
		return (a.getHours()+':'+a.getMinutes());
	}
 	return (months[a.getMonth()]+'/'+a.getDate());
}
function findmax(j)
{
	if(readings.length==0) return 0;
	var maxi=readings[0][j];
	for(var i=0;i<readings.length;i++)
	{
		if(maxi<readings[i][j])
		{
			maxi=readings[i][j];
		}
	}
	return maxi;
}
function findmin(j)
{
	if(readings.length==0) return 0;
	var maxi=readings[0][j];
	for(var i=0;i<readings.length;i++)
	{
		if(maxi>readings[i][j])
		{
			maxi=readings[i][j];
		}
	}
	return maxi;
}
function replypost(postid)
{
	window.Keyboard.showKeyboard();
	ListDemo.detailPanel.scroll=false;
//	window.scroll(0,0);
	isreply=1;
	Ext.getCmp('texty').focus();
	b=2;
	c=postid;
}
var btnclick=0;
function yespost(postid)
{
	b=1;
	c=postid;
	typedtext="measure my weight";
	btnclick=1;
	postcomment(1,b,c,"measure my weight");
}
var d;
function connectmhealth(postid)
{
	c=postid;
	d = postid;
	typedtext = "Yes, please connect me to AT&T mHealth.";
	btnclick = 3;
	postcomment(1,2,c,"Yes, please connect me to AT&T mHealth.");

	typedtext = "Data was uploaded successfully :)";
	setTimeout("postdown=1;postcomment(7,2,d,typedtext);", 2000);
	
}
function nopost(postid)
{
	b=1;
	c=postid;
	typedtext="My Trend";
	btnclick=2;
	postcomment(1,b,c,"My Trend");	
}
function nopost1(postid)
{
	b=1;
	c=postid;
	typedtext="My Trend";
	btnclick=2;
	postcomment(1,2,c,"My Trend");	
}
function hideText()
{
	document.getElementById("defaulttext").value="";
	document.getElementById("defaulttext").className="blacktext";
}
function showtext()
{
	typedtext=document.getElementById("defaulttext").value;
	document.getElementById("defaulttext").value="What's Up?";
	document.getElementById("defaulttext").className="greytext";
}
function loadfunction()
{
	typedtext="Hi! I'm MyWeight. Nice to meet you!";
	setTimeout("ListDemo.Viewport.setActiveItem('detailpanel');postcomment(2,1,1,typedtext);",3000);
	setTimeout("posthint(1)",6000);
	setTimeout("pairweightscale(1)",8000);
}
function posthint(id)
{
	typedtext="Here are some useful tips on how to talk with me:";
	postcomment(2,1,id,typedtext);
	postcomment(1,3,3,"");
}
function pairweightscale(id)
{
	if (id==1)
	{
		typedtext="How can I help you?";
		//navigator.notification.vibrate(0);
		postid = postcomment(2,4,1,typedtext);
		
	}
}
function updateylabel()
{
	var temp;
	if (readings.length>=5)
	{
		for (i=1;i<=5;i++)
			{
				temp=Math.round(i*readings.length/6);
				ylabel[i-1]=readings[temp][1];
			}
		ylabel[4]=readings[readings.length-1][1];
	}
	else
		{
			
		for (var i=0;i<readings.length;i++)
			{
			ylabel[i]=readings[i][1];
			}
		}
}