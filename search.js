<!--
var xml;
var busca;
var posicao = '';
var controle = 0;
var controlKey = 0;
var tc;
var strkey;
var teste;
var tempo = 0;
function getXmlHttpRequestObject() {
    if (window.ActiveXObject) {
        xml = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if (window.XMLHttpRequest) {
        xml = new XMLHttpRequest();                
    }
}
function teclado(e) 
{	
	if (!e) var e = window.event; 
	
	if (e.keyCode) tc = e.keyCode;
    else if (e.which) tc = e.which;

	if(tc == 13)
	{
		document.getElementById('search_div').innerHTML = '';
		var texto = document.form2.q.value;
		document.getElementById('search_div').style.visibility = 'hidden';
		controle = 0;
		setSearch(texto);
	}
	
	var divs = document.getElementById('search_div');

	if(tc != 40 && tc != 38 && tc != 37 && tc != 13)
	{
	  controlKey = 0;
	  controle = 0;
	  posicao = '';
	}
    if(tc == 40)
	{
		controle = 1;
		
		controlKey = 0;
		
		if(posicao=='' || posicao==undefined)
		{	
			posicao = divs.firstChild; 
			busca = posicao.innerHTML;
    		posicao.className = 'suggest_link_top_over';
			document.form2.q.value = busca;	
		}
		else
		{
			if(posicao.id=='suggest_link_top' || posicao.className=='spanclass')
			{
				suggestOutTOP(posicao);
			}
			else
			{
				suggestOut(posicao);
			}
			
			var pnext = posicao.nextSibling;
			
			if(pnext.className=='spanclass')
			{
				pnext = divs.firstChild; 
			}
					
			posicao = pnext;
			
			if(posicao.id=='suggest_link_top')
			{
				suggestOverTOP(posicao);
			}
			else
			{
				suggestOver(posicao);
			}
		}
	}
	if(tc == 38)
	{
		controle = 1;
		
		if(posicao.id=='suggest_link_top' || posicao.className=='spanclass')
		{
			suggestOutTOP(posicao);
		}
		else
		{
			suggestOut(posicao);
		}
		
		var pprev = posicao.previousSibling;
			
		if(pprev==null || pprev=='null')
		{
			pprev = divs.lastChild; 
			pprev = pprev.previousSibling;
		}
					
		posicao = pprev;
		
		
		if(posicao.id=='suggest_link_top')
		{
			suggestOverTOP(posicao);
		}
		else
		{
			suggestOver(posicao);
		}
	}
    if(tc == 27)
	{
		busca = '';
		document.form2.q.value = "";
		document.getElementById('search_div').innerHTML = '';
		document.getElementById('search_div').style.visibility = 'hidden';	
		controle = 0;
		posicao = '';
		xml = false;
    }
}
function call(value, api)
{	
	controlKey = 1;

	getXmlHttpRequestObject();
	if(api===0){
    	xml.open("GET", 'listacidades.php?word=' + strkey, true);
        xml.onreadystatechange = suggestBox;
        xml.send(null);
    }
	if(api==1){
    	var res = value.split(" - ");
    	xml.open("GET", 'http://lb-aws-1105894158.sa-east-1.elb.amazonaws.com/profissao/'+res[1]+'/'+ res[0].replace(" ", "%20")+'?api-key=ddd70c32-fc98-4618-b494-a9698f824353', true);
        xml.onreadystatechange = suggestBoxPro;
        xml.send(null);
    }
	if(api==2){
    	var res = document.form2.q.value.split(" - ");
    	xml.open("GET", 'http://lb-aws-1105894158.sa-east-1.elb.amazonaws.com/entidade/'+value+'/'+res[1]+'/'+ res[0].replace(" ", "%20")+'?api-key=4b94dba2-5524-4632-939b-92df1c50a645', true);
        xml.onreadystatechange = suggestBoxEnt;
        xml.send(null);
    }
	if(api==3){
	   var res = document.getElementById('q').value.split(' - ');
	   var entidade = document.getElementById('entidade').value;
	   var postjson ='{"entidade": "'+entidade+'","uf": "'+res[1]+'","cidade": "'+res[0].replace(" ", "%20")+'","datanascimento": ["'+value+'"]}';
	   //var postjson = '{"entidade": "AIPESP","uf": "SP","cidade": "Araraquara","datanascimento": ["1981-02-19"]}';
     	
    	xml.open("POST", 'http://lb-aws-1105894158.sa-east-1.elb.amazonaws.com/plano?api-key=261fd4d0-fd9f-468a-afa9-f5a89ed3701c', true);
     	xml.setRequestHeader('Content-type', 'application/json');
        xml.onreadystatechange = GetResult;
        xml.send(postjson);
    }
}
function searchSuggest() {
	if(controle==0)
	{
		strkey = document.form2.q.value;
		var k = strkey.length;
		if(k>=0)
		{
			if(controlKey==0)
			{
				clearTimeout(tempo);	
				tempo = setTimeout("call('',0)",700);
			}
		}
		else
		{
			document.getElementById('search_div').innerHTML = '';
			document.getElementById('search_div').style.visibility = 'hidden';
		}
	}
}
function suggestOver(div_value) {
	if(posicao.id=='suggest_link_top')
	{
		suggestOutTOP(posicao);
	}
	else
	{
		suggestOut(posicao);
	}
	busca = div_value.innerHTML;
	posicao = div_value;
    posicao.className = 'suggest_link_over';
	document.form2.q.value = busca;
}
function suggestOverTOP(div_value) {
	if(posicao.id=='suggest_link_top')
	{
		suggestOutTOP(posicao);
	}
	else
	{
		suggestOut(posicao);
	}
	busca = div_value.innerHTML;
	posicao = div_value;
    posicao.className = 'suggest_link_top_over';
	document.form2.q.value = busca;
}
function suggestOut(div_value) {
    div_value.className = 'suggest_link';
    document.form2.q.value = '';
}
function suggestOutTOP(div_value) {
	div_value.className = 'suggest_link_top';
}
function setSearch(value) {
    document.form2.q.value = value;
    loadingapi('show');
    document.getElementById('search_div').innerHTML = '';
	document.getElementById('search_div').style.display = 'none';
	document.getElementById('localidade_div').style.display = 'none'
	setTimeout(call(value, 1),500)
	value = '';
}
function setProfissao() {
    ValeuPro = document.getElementById('profissao').value;
    loadingapi('show');
	document.getElementById('profissao_div').style.display = 'none'
	setTimeout(call(ValeuPro, 2),500)
}
function setEntidade() {
    ValeuEnt = document.getElementById('entidade').value;
	document.getElementById('entidade_div').style.display = 'none'
	document.getElementById('nascimento_div').style.display = 'block';
}
function buscaplanos() {
    ValeuNascimento = document.getElementById('nascimento').value;
    loadingapi('show');
	//document.getElementById('search_div').style.visibility = 'hidden';
	setTimeout(call(ValeuNascimento, 3),500)
}
function noenter(evt) 
{
	var evt = (evt) ? evt : ((event) ? event : null);
	var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
	if ((evt.keyCode == 13) && (node.type=="text"))  {return false;} 
	
}
function suggestBox() 
{	
	if(xml.readyState == 4)
	{
	    loadingapi('hide');
		if(controle==0)
		{
        	var ss = document.getElementById('search_div');
        	ss.innerHTML = '';
        	var str = xml.responseText.split("\n");
			if(str.length<1)
			{
				posicao = '';
    			document.getElementById('search_div').innerHTML = '';
				document.getElementById('search_div').style.visibility = 'hidden';
			}
			else
			{			
				var palvr = str.length -1;
				for(i=0; i<palvr ; i++) 
				{
        	        var separaid = str[i].split("|");
				    var medid = separaid[0];
				    var meddesc = separaid[1];
					var suggest = '<div onmouseover="javascript:suggestOver(this);" ';		
        		    suggest += 'onclick="javascript:setSearch(this.innerHTML);" ';
				    suggest += 'onmouseout="javascript:suggestOut(this);" ';
            		suggest += 'id="suggest_link" class="suggest_link">' + meddesc + '</div>';
					ss.innerHTML += suggest;
				}
				ss.style.visibility = 'visible';
        	}
		}
	}
}
function suggestBoxPro() 
{	
	if(xml.readyState == 4)
	{
	    loadingapi('hide');
		if(controle==0)
		{
        	var ss = document.getElementById('profissao_div');
        	var str = xml.responseText.split("\n");
			if(str.length<1)
			{
				posicao = '';
    			document.getElementById('profissional_div').innerHTML = 'Nenhuma profissão foi encontrada';
			}
			else
			{	
                let dropdown = document.getElementById('profissao');
                dropdown.length = 0;
                
                let defaultOption = document.createElement('option');
                defaultOption.text = 'Escolher Profissão';
                
                dropdown.add(defaultOption);
                dropdown.selectedIndex = 0;
            
                const data = JSON.parse(str);
                let option;
                for (let i = 0; i < data.length; i++) {
                  option = document.createElement('option');
                  option.text = data[i].profissao;
                  option.value = data[i].profissao;
                  dropdown.add(option);
                }
				ss.style.display = 'block';				
        	}
		}
	}
}

function suggestBoxEnt() 
{	
	if(xml.readyState == 4)
	{
	    loadingapi('hide');
		if(controle==0)
		{
        	var ss = document.getElementById('entidade_div');
        	var str = xml.responseText.split("\n");
			if(str.length<1)
			{
				posicao = '';
    			document.getElementById('entidade_div').innerHTML = 'Não temos entidades para está profissão nesta localidade';
			}
			else
			{	
                let dropdown = document.getElementById('entidade');
                dropdown.length = 0;
                
                let defaultOption = document.createElement('option');
                defaultOption.text = 'Escolher Entidade';
                
                dropdown.add(defaultOption);
                dropdown.selectedIndex = 0;
            
                const data = JSON.parse(str);
                let option;
                for (let i = 0; i < data.length; i++) {
                  option = document.createElement('option');
                  option.text = data[i].NomeFantasia + " - " + data[i].RazaoSocial;
                  option.value = data[i].NomeFantasia;
                  dropdown.add(option);
                }

				ss.style.display = 'block';				
        	}
		}
	}
}
function GetResult() 
{	
	if(xml.readyState == 4)
	{
	    loadingapi('hide');
		if(controle==0)
		{
		    var str = xml.responseText
        	var qs = document.getElementById('quadroresultados');
        	qs.innerHTML = '';
            const data = JSON.parse(str);

               result ='<div class="container">';
               result +='<h2>Total de Planos: '+data["total"]+'</h2>';
               resultfor = '';
                  for (let i = 0; i < data['planos'].length; i++) {
                    resultfor +='<div class="container ';
                     if (i % 2 == 0) {
                      resultfor +=' planopar">';
                     }else{
                      resultfor +=' planoimpar">';  
                     }
                    resultfor += '<div class="row">';
                    resultfor += '<img src="'+data['planos'][i]['operadoraLogo']+'" alt="'+data['planos'][i]['operadora']+'">';
                    resultfor += '<div class="tituloplano"><h3>'+data['planos'][i]['plano']+'<h3></div>';
                    resultfor += '</div>';
                    resultfor += '<div class="row">';
                    resultfor += '<div class="col-xl-3"><p><b>Operadora:</b> '+data['planos'][i]['operadora']+'<p></div>';
                    resultfor += '<div class="col-xl-3"><p><b>Acomodação:</b> '+data['planos'][i]['tipo_acomodacao']+'<p></div>';
                    resultfor += '<div class="col-xl-3"><p><b>Segmentação:</b> '+data['planos'][i]['segmentacao']+'<p></div>';
                    resultfor += '<div class="col-xl-3"><p><b>Preço:</b> R$ '+data['planos'][i]['precos']['total'].replace(".", ",")+'<p></div>';
                    resultfor += '</div>';
                    resultfor += '</div>';
                }
                result += resultfor +'</div>';
                document.getElementById('quadroresultados').style.display = 'block';
                document.getElementById('footer').style.position = 'relative';
				qs.innerHTML += result;
				qs.style.display = 'block';
				unset(result, resultfor)
		}
	}
}
function limpar()
{
	if(busca==undefined)
	{
		document.getElementById('search_div').innerHTML = '';
		document.getElementById('search_div').style.visibility = 'hidden';
		controle = 0;
		posicao = '';
	}
	else
	{
		document.form2.q.value = document.form2.q.value;
		document.getElementById('search_div').innerHTML = '';
		document.getElementById('search_div').style.visibility = 'hidden';
		controle = 0;
		busca = '';
		posicao = '';
		xml = false;
	}
}

function validate(){
        var v = this.value;
}
function loading(){
  document.getElementById('loading').style.visibility = 'hidden';
  document.getElementById('containersite').style.visibility = 'visible';
}
function loadingapi(value){
    if(value=='show')
      document.getElementById('loadingapi').style.display = 'flex';
    if(value=='hide')
      document.getElementById('loadingapi').style.display = 'none';
}
-->