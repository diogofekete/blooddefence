function Point(a,b){this.position={x:a||0,y:b||0}}function Player(){this.accuracy=0,this.energy=0,this.score=0,this.woundSize=0}function Blood(a,b,c,d){this.maxVelocity=Math.random()/8+.1+d,this.acceleration={x:.01,y:0},this.heal=1,this.img=document.getElementById("rbc_img"),this.radius=this.img.width/2;var e=0-2*this.radius,f=Math.random()*(b-this.radius)+c+this.radius;this.position={x:e,y:f},this.velocity={x:.1,y:0}}function Enemy(a,b,c,d){switch(this.type=d,this.type){case"VIRUS":this.maxVelocity=Math.random()/5+.2,this.acceleration={x:-.005,y:0},this.damage=1,this.img=document.getElementById("virus_img");break;case"BACTERIA":this.maxVelocity=Math.random()/5+.2,this.acceleration={x:-.003,y:0},this.damage=2,this.img=document.getElementById("bacteria_img");break;case"PROTOZOA":this.maxVelocity=Math.random()/7+.15,this.acceleration={x:-.005,y:0},this.damage=5,this.img=document.getElementById("protozoa_img");break;case"FUNGI":this.maxVelocity=Math.random()/7+.15,this.acceleration={x:-.003,y:0},this.damage=8,this.img=document.getElementById("fungi_img");break;default:}this.radius=this.img.width/2;var e=a+2*this.radius,f=Math.random()*(b-this.radius)+c+this.radius;this.position={x:e,y:f},this.velocity={x:-.001,y:0}}function WBC(a,b,c){this.position={x:a,y:b},this.radius=c}function Vitamin(a,b,c,d){switch(this.type=d,this.lifeTime=250*Math.random(),this.score=10,this.boneMarrowSize=0,this.rbcUnits=0,this.boneMarrowRegeneration=0,this.rbcVelocityBoost=0,this.killVirus=!1,this.type){case"A":this.boneMarrowSize=30,this.img=document.getElementById("carrot");break;case"B2":this.rbcUnits=1,this.img=document.getElementById("almonds");break;case"B9":this.boneMarrowRegeneration=.05,this.img=document.getElementById("broccoli");break;case"C":this.killVirus=!0,this.img=document.getElementById("orange");break;case"K":this.rbcVelocityBoost=.05,this.img=document.getElementById("lettuce");break;default:}this.radius=this.img.width>this.img.height?this.img.width/2:this.img.height/2;var e=Math.random()*(a-this.radius),f=Math.random()*(b-c)+c;this.position={x:e,y:f}}Point.prototype.distanceTo=function(a){var b=a.position.x-this.position.x,c=a.position.y-this.position.y;return Math.sqrt(b*b+c*c)},Point.prototype.clonePosition=function(){return{x:this.position.x,y:this.position.y}};var p=new Point;Blood.prototype=new Point,Blood.prototype.update=function(a){this.velocity.x+=this.acceleration.x,this.velocity.y+=this.acceleration.y,this.velocity.x>this.maxVelocity?this.velocity.x=this.maxVelocity:this.velocity.x<-this.maxVelocity&&(this.velocity.x=-this.maxVelocity),this.velocity.y>this.maxVelocity?this.velocity.y=this.maxVelocity:this.velocity.y<-this.maxVelocity&&(this.velocity.y=-this.maxVelocity),this.position.x+=this.velocity.x*a,this.position.y+=this.velocity.y*a},Blood.prototype.left=function(){return this.position.x-this.radius},Blood.prototype.right=function(){return this.position.x+this.radius},Blood.prototype.top=function(){return this.position.y-this.radius},Blood.prototype.bottom=function(){return this.position.y+this.radius},Enemy.prototype=new Point,Enemy.prototype.update=function(a){this.velocity.x+=this.acceleration.x,this.velocity.y+=this.acceleration.y,this.velocity.x>this.maxVelocity?this.velocity.x=this.maxVelocity:this.velocity.x<-this.maxVelocity&&(this.velocity.x=-this.maxVelocity),this.velocity.y>this.maxVelocity?this.velocity.y=this.maxVelocity:this.velocity.y<-this.maxVelocity&&(this.velocity.y=-this.maxVelocity),this.position.x+=this.velocity.x*a,this.position.y+=this.velocity.y*a},Enemy.prototype.left=function(){return this.position.x-this.radius},Enemy.prototype.right=function(){return this.position.x+this.radius},Enemy.prototype.top=function(){return this.position.y-this.radius},Enemy.prototype.bottom=function(){return this.position.y+this.radius},WBC.prototype=new Point,WBC.prototype.left=function(){return this.position.x-this.radius},WBC.prototype.right=function(){return this.position.x+this.radius},WBC.prototype.top=function(){return this.position.y-this.radius},WBC.prototype.bottom=function(){return this.position.y+this.radius},Vitamin.prototype=new Point,Vitamin.prototype.left=function(){return this.position.x-this.radius},Vitamin.prototype.right=function(){return this.position.x+this.radius},Vitamin.prototype.top=function(){return this.position.y-this.radius},Vitamin.prototype.bottom=function(){return this.position.y+this.radius},GameWorld=new function(){function Y(){if(q)s.drawImage(background_img,0,0,f.width,f.height),delta=(new Date).getTime()-p,mb(),fb(),p=(new Date).getTime();else switch(e){case"PAUSE":ub();break;case"LEVELSELECTED":p+c>(new Date).getTime()?sb():Eb();break;case"GAMEOVER":p+b>(new Date).getTime()?ub(j):Cb();break;default:}}function Z(){document.getElementById("background_audio").muted=!document.getElementById("background_audio").muted}function $(){q=!q,q?(delta=(new Date).getTime(),p=(new Date).getTime(),e=""):e="PAUSE"}function _(){if(q)for(var a=0;g.rbc>a;a++){var b=new Blood(0,v.woundSize,K+v.energy*d,g.rbcXBoost);C.push(b)}}function ab(){q&&D.push(new Enemy(r.width,v.woundSize,K+v.energy*d,"VIRUS"))}function bb(){q&&D.push(new Enemy(r.width,v.woundSize,K+v.energy*d,"BACTERIA"))}function cb(){q&&D.push(new Enemy(r.width,v.woundSize,K+v.energy*d,"PROTOZOA"))}function db(){q&&D.push(new Enemy(r.width,v.woundSize,K+v.energy*d,"FUNGI"))}function eb(a,b){return f.width/b-s.measureText(a).width/2}function fb(){hb(),jb(),ib(),kb(),lb(),gb()}function gb(){s.font="Bold 20px sans-serif",s.fillStyle="rgba(243,243,21,0.5)",s.fillText("Bone Marrow",S,J-56),(0>=V||0==V%5)&&(s.fillStyle="rgba(2,2,1,1)",s.strokeRect(S,J-50,g.boneMarrowCapacity,J-30),s.fillStyle="rgba(240,240,210,0.4)",s.fillRect(S+1,J-48,T-1,J-33)),V>0&&V--,s.font="Bold 30px Calibri",s.fillStyle="rgba(100,243,21,0.8)",s.fillText("Stage "+g.id,eb("stage 1",2),J-30),s.fillText(g.name,eb(g.name,2),J-5),s.drawImage(pause_img,W,I+20),s.font="Bold 30px Calibri",s.fillStyle="rgba(10,10,210,0.8)",s.fillText("LOSE",f.width/8,I+30),s.fillText("WIN",f.width/8+350,I+30),s.fillText(v.energy+" %",f.width/5,I+60),s.fillStyle="rgba(2,2,1,1)",s.strokeRect(f.width/8,I+40,400,23),s.fillStyle="rgba(240,100,110,0.6)",s.fillRect(f.width/8+1,I+41,4*v.energy-1,21),s.font="Bold 40px Calibri",s.fillStyle="rgba(243,243,21,0.5)",s.fillText("SCORE: "+v.score,3*(r.width/4),I+40),s.fillText("ACCURACY: "+v.accuracy+"%",3*(f.width/4)-s.measureText("ACCURACY").width/4,I+75),rb()}function hb(){if(v.energy>0){var a=v.energy*d;s.fillStyle="rgba(243,243,21, 0.9)",s.fillRect(f.width-20,0,f.width,K+a),s.fillStyle="rgba(243,243,21, 0.9)",s.fillRect(f.width-20,L+g.gapSize-a,f.width,f.height),v.woundSize=L+g.gapSize-a-(K+a)}}function ib(){for(var a=0;C.length>a;a++){var b=C[a];s.drawImage(b.img,b.left(),b.top())}}function jb(){var a=WBC_normal;25>=v.energy?a=WBC_losing:v.energy>=75&&(a=WBC_winning);for(var b=0;B.length>b;b++){var c=B[b];s.drawImage(a,c.left(),c.top())}}function kb(){for(var a=0;D.length>a;a++){var b=D[a];s.drawImage(b.img,b.left(),b.top())}}function lb(){for(var a=0;E.length>a;a++){var b=E[a];s.drawImage(b.img,b.left(),b.top())}}function mb(){ob(),pb(),zb("increase"),nb()}function nb(){for(var a=0;E.length>a;a++){var b=E[a];null!=b&&(0>=b.lifeTime?E.splice(a,1):b.lifeTime--)}if(E.length<g.vitamins&&Math.random()<g.vitaminRate){var c,d=Math.random();c=.2>=d?"A":.4>=d?"B2":.6>=d?"B9":.8>=d?"K":"C",E.push(new Vitamin(f.width-f.toolMargin,I,J,c))}}function ob(){for(var a=0;D.length>a;a++){var b=D[a];if(null!=b){if(B.length>0)for(var c=0;B.length>c;c++){var d=B[c];if((d.left()>=b.left()&&d.left()<=b.right()||d.right()>=b.left()&&d.right()<=b.right())&&(d.bottom()>=b.top()&&d.bottom()<=b.bottom()||d.top()>=b.top()&&d.top()<=b.bottom())){var e,f,g,h,i=b.bottom()-b.top();d.top()<b.top()?(g=d.bottom()-b.top(),f=d.top(),e=d.right()):d.top()>b.top()&&(g=b.bottom()-d.top(),f=b.top(),e=b.left()),h=~~(100*(g/i)),10>h&&(h=10),qb(h+"%","Bold 50px Calibri","rgba(0,0,0,",e,f,0,-2,.05),v.accuracy=~~((v.accuracy+h)/2),v.score+=~~(g/i*b.damage),D.splice(a,1),B.splice(c,1),a--,c--;break}}if(0>b.right())v.energy-=b.damage,D.splice(a,1),a--,0>=v.energy&&tb(!1);else{var j=Math.random();b.acceleration.y=.5>j?-1*Math.random():Math.random(),b.update(delta)}}}}function pb(){for(var a=0;C.length>a;a++){var b=C[a];if(null!=b){for(var c=0;D.length>c;c++){var d=D[c];if(b.right()>=d.left()&&b.right()<=d.right()&&(b.bottom()>=d.top()&&b.bottom()<=d.bottom()||b.top()>=d.top()&&b.top()<=d.bottom())){"VIRUS"==d.type&&Math.random()<=g.virusDuplicationRate&&D.push(new Enemy(d.right(),d.img.height,d.position.y,"VIRUS")),C.splice(a,1),a--;break}}if(b.right()>f.width-20)v.energy>=100?tb(!0):v.energy+=b.heal,C.splice(a,1),a--;else{var e=Math.random();b.acceleration.y=.5>e?-1*Math.random():Math.random(),b.update(delta)}}}}function qb(a,b,c,d,e,g,h,i){var j=s.measureText(a).width,k={text:a,font:b,color:c,xLocation:d+j>f.width?d-j:d,yLocation:e,xDeslocation:g,yDeslocation:h,alpha:1,alphaReduction:i};F.push(k)}function rb(){for(i=0;F.length>i;i++)h=F[i],null!=h&&(s.font=h.font,s.fillStyle=h.color+h.alpha+")",s.fillText(h.text,h.xLocation,h.yLocation),h.xLocation+=h.xDeslocation,h.yLocation+=h.yDeslocation,h.alpha-=h.alphaReduction,0>=h.alpha&&F.splice(i,1))}function sb(){img=document.getElementById("stage"+(t+1)),s.drawImage(background_img,0,0,f.width,f.height),s.drawImage(img,0,0,f.width,f.height)}function tb(a){q=!1,e="GAMEOVER",a?(j="YOU WIN",u=g.id):j="GAME OVER",document.getElementById("background_audio").muted=!0}function ub(){s.drawImage(background_img,0,0,f.width,f.height),"PAUSE"==e?(s.drawImage(menu_img,menuStartX,menuStartY,100,100),s.font="Bold 70px Calibri",s.fillStyle="rgba(150,150,150,0.8)",s.fillText("PAUSE",eb("PAUSE",2),f.height/3),s.fillStyle="rgba(50,50,50,1)",s.fillText("RESUME",eb("RESUME",2),f.height/2)):(s.font="Bold 90px Calibri",s.fillStyle="YOU WIN"==arguments[0]?"rgba(23,2,201,0.9)":"rgba(230,24,21,0.9)",s.fillText(arguments[0],eb(arguments[0],2),f.height/2)),s.font="Bold 40px Calibri",s.fillStyle="rgba(0,220,221,0.5)",s.fillText("HEALTH: "+(0>=v.energy?"0":"100"),eb("HEALTH: 100",2),f.height/2+100),s.fillText("SCORE: "+v.score,eb("SCORE: 100",2),f.height/2+150),s.fillText("ACCURACY: "+v.accuracy+"%",eb("ACCURACY: 100%",2),f.height/2+200)}function vb(a){var b=GameWorld.gameWorld,c=a.clientX,d=a.clientY;if(q)c>b.width-b.toolMargin&&(c=b.width-b.toolMargin),I>d&&d>J?H=!0:(H=!1,w=c>=W&&W+pause_img.width>=c&&d>=X&&X+pause_img.height>=d);else{if("PAUSE"==e){var g=s.measureText("RESUME");x=c>=eb("RESUME",2)&&eb("RESUME",2)+g.width>=c&&f.height/2+35>=d&&d>=f.height/2-35}else c>=N&&O>=c&&P+Q>=d&&d>=P-Q+25&&c/M%1>=.45&&.8>=c/M%1?(t=Math.floor(c/M),R=!0):R=!1,z=c>=soundStartX&&soundEndX>=c&&soundEndY>=d&&d>=soundStartY;y=c>=menuStartX&&menuEndX>=c&&menuEndY>=d&&d>=menuStartY}A.x=c,A.y=d}function wb(a){a.preventDefault(),q?H?xb()||Bb():w&&$():("PAUSE"==e?x&&$():R?(R=!1,Db()):z&&(Z(),z=!1),y&&(y=!1,window.history.back()))}function xb(){var a=!1;if(E.length>0)for(var b=0;E.length>b;b++){var c=E[b];if(null!=c&&A.x>=c.left()&&A.x<=c.right()&&A.y>=c.top()&&A.y<=c.bottom()){yb(c),qb("Vitamin "+c.type,"Bold 40px Calibri","rgba(0,204,20,",A.x,A.y,0,0,.01),E.splice(b,1),b--,a=!0;break}}return a}function yb(a){if(g.boneMarrowCapacity+=a.boneMarrowSize,g.rbc+=a.rbcUnits,g.boneMarrowRegeneration+=a.boneMarrowRegeneration,g.rbcXBoost+=a.rbcVelocityBoost,a.killVirus)for(var b=0;D.length>b;b++){var c=D[b];null!=c&&"VIRUS"==c.type&&(v.score+=c.damage,D.splice(b,1),b--)}v.score+=a.score}function zb(a){var b=T,c=g.boneMarrowCapacity;switch(a){case"increase":U-=g.boneMarrowStamina,0>U&&(U=0),b+=g.boneMarrowRegeneration;break;case"decrease":b-=U;break;default:return}b>=c&&(b=c),0>=b&&(b=0),T=b}function Ab(){for(var a=!0,b=0;B.length>b;b++){var c=B[b];if(null!=c&&A.x>=c.left()&&A.x<=c.right()&&A.y>=c.top()&&A.y<=c.bottom()){a=!1;break}}return a}function Bb(){U+=g.boneMarrowWbcUse,T>=U?Ab()&&(B.push(new WBC(A.x,A.y,WBC_normal.width/2)),zb("decrease")):V=15}function Cb(){s.drawImage(stageBackground_img,0,0,f.width,f.height);var a;a=document.getElementById("background_audio").muted?off_img:on_img,s.drawImage(a,f.width/1.08,f.height/2,100,50);var b=0,c=M/2;N=M/3;for(var d=1;Stages.length>=d;d++)u+1>=d?s.drawImage(levels_img,30+b,130,50,Q,c,P,50,Q):s.drawImage(levels_img,30+b,25,50,Q,c,P,50,Q),b=100*d,c+=M;O=c+M}function Db(){t>u||(g={id:Stages[t].id,name:Stages[t].name,health:Stages[t].health,rbc:Stages[t].rbc,rbcInterval:Stages[t].rbcInterval,rbcXBoost:Stages[t].rbcXBoost,virus:Stages[t].virus,virusDuplicationRate:Stages[t].virusDuplicationRate,bacteria:Stages[t].bacteria,protozoa:Stages[t].protozoa,fungi:Stages[t].fungi,gapSize:Stages[t].gapSize,boneMarrowCapacity:Stages[t].boneMarrowCapacity,boneMarrowRegeneration:Stages[t].boneMarrowRegeneration,boneMarrowWbcUse:Stages[t].boneMarrowWbcUse,boneMarrowStamina:Stages[t].boneMarrowStamina,vitamins:Stages[t].vitamins,vitaminRate:Stages[t].vitaminRate},v=new Player,r.style.cursor="default",null!=o&&(clearInterval(o),o=null),null!=k&&(clearInterval(k),k=null),null!=l&&(clearInterval(l),l=null),null!=m&&(clearInterval(m),m=null),null!=n&&(clearInterval(n),n=null),O=0,e="LEVELSELECTED",p=(new Date).getTime())}function Eb(){q=!0,e="",B=[],C=[],D=[],G=g.rbcInterval,v.woundSize=g.gapSize,v.energy=g.health,T=g.boneMarrowCapacity,U=0,R=!1,o=setInterval(_,G),g.virus>0&&(k=setInterval(ab,g.virus)),g.bacteria>0&&(l=setInterval(bb,g.bacteria)),g.protozoa>0&&(m=setInterval(cb,g.protozoa)),g.fungi>0&&(n=setInterval(db,g.fungi))}var g,j,k,l,m,n,o,r,s,v,G,N,O,T,a=60,b=5500,c=3e3,d=.5,e="GAMEOVER",f={width:UserProfile.isTouchDevice()?window.innerWidth:window.innerWidth-window.innerWidth/50,height:UserProfile.isTouchDevice()?window.innerHeight:window.innerHeight-window.innerHeight/40,toolMargin:window.innerWidth/10},p=0,q=!1,t=0,u=t,w=!1,x=!1,y=!1,z=!1,A={x:0,y:0},B=[],C=[],D=[],E=[],F=[],H=!1,I=f.height-100,J=75,K=(I-J)/2-J,L=K*d+K,M=(f.width-f.toolMargin)/Stages.length,P=f.height-70,Q=55,R=!1,S=f.width/8,U=0,V=0,W=5,X=I+20;soundStartX=f.width/1.086,soundEndX=f.width/1.021,soundStartY=f.height/2.58,soundEndY=f.height/2.05,menuStartX=0,menuEndX=f.width/10,menuStartY=f.height/2.58,menuEndY=f.height/1.814,this.gameWorld=f,this.initialize=function(){r=document.getElementById("world"),r&&r.getContext&&(s=r.getContext("2d"),document.addEventListener("mousemove",vb,!1),document.addEventListener("mousedown",wb,!1),r.width=f.width,r.height=f.height,WBC_normal=document.getElementById("wbc_normal"),WBC_winning=document.getElementById("wbc_winning"),WBC_losing=document.getElementById("wbc_loosing"),pause_img=document.getElementById("pause_img"),levels_img=document.getElementById("levels"),menu_img=document.getElementById("menu"),off_img=document.getElementById("off"),on_img=document.getElementById("on"),setInterval(Y,1e3/a),Cb())}};