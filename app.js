const root=document.getElementById('TypingApp');
if(root){
  const TEXTS=['The quick brown fox jumps over the lazy dog while the sun sets slowly behind the quiet hills.','Practice is the bridge between knowing what to do and actually being able to do it well.','A small daily habit, kept for a year, will quietly outrun a burst of effort that never returns.','Good code reads like a sentence, and the best comment is the one you did not need to write.'];
  const $=id=>root.querySelector('#'+id);
  const sample=$('ty-sample'),input=$('ty-input');let text='',start=0,timer=null;
  function paint(){const typed=input.value;let html='';for(let i=0;i<text.length;i++){let cls='';if(i<typed.length)cls=typed[i]===text[i]?'ok':'bad';else if(i===typed.length)cls='cur';html+='<span class="'+cls+'">'+(text[i]===' '?'&nbsp;':text[i].replace('<','&lt;'))+'</span>';}sample.innerHTML=html;}
  function stats(){const typed=input.value,elapsed=(Date.now()-start)/1000||0.001;let correct=0;for(let i=0;i<typed.length;i++)if(typed[i]===text[i])correct++;
    const words=correct/5,wpm=Math.round(words/(elapsed/60));const acc=typed.length?Math.round(correct/typed.length*100):100;
    $('ty-wpm').textContent=(isFinite(wpm)?wpm:0)+' wpm';$('ty-acc').textContent=acc+'%';$('ty-time').textContent=Math.floor(elapsed)+'s';}
  function load(){text=TEXTS[Math.floor(Math.random()*TEXTS.length)];input.value='';start=0;if(timer){clearInterval(timer);timer=null;}$('ty-wpm').textContent='0 wpm';$('ty-acc').textContent='100%';$('ty-time').textContent='0s';paint();}
  input.addEventListener('input',()=>{if(!start){start=Date.now();timer=setInterval(stats,500);}paint();stats();if(input.value.length>=text.length&&timer){clearInterval(timer);timer=null;stats();}});
  $('ty-new').addEventListener('click',load);
  root.addEventListener('myos:close',()=>{if(timer){clearInterval(timer);timer=null;}});
  load();
}
