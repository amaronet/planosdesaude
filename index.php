<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Seu Plano de Saúde</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">  
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"/>
<meta http-equiv="Content-Language" content="pt-br"/>
<meta name="author" content="Amaro"/>
<meta name="description" content="Encontre agora seu Plano de Saúde com uma Administradora de Benefícios."/>
<meta name="keywords" content="plano, saude, qualicorp, administradora, benefícios, api service"/>
<meta name="robots" content="all"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="https://amaro.net/planosdesaude/css/estilo.css"/>
<script type="text/javascript" src="https://amaro.net/planosdesaude/search.js"></script>
<style>

</style>
</head>
<body onLoad="loading()">
<div id="loading" class="textocarregando">
<img src="./img/loader.gif" alt="Carregando..." />
</div> 
<div id="containersite">
    <div class="container">
        <div class="topocc">
            <div class="logo">
                <a href="https://amaro.net/planosdesaude/"><img src="./img/logo.png" alt="Planos de Saúde" /></a>
            </div>

        <h1>Encontre agora seu plano de saúde!</h1>
        </div>
    	<div id="quadrobusca">
    		<form action="#" method="post" name="form2" target="_self" id="form2">
    		    <div id="localidade_div">
    	            <h2>Qual cidade você mora?</h2>
        			<input type="text" id="q" name="q" value="" size="36" onKeyUp="teclado(event);searchSuggest();" autocomplete="off" onKeyPress="return noenter(event);"/>
        			&nbsp;<br />
        			<div id="search_div"></div>
    			</div>
    			
    			<div id="profissao_div">
    	            <h2>Qual sua profissão?</h2>
                    <select id="profissao" name="profissao" onChange="javascript:setProfissao();">
                    </select>
    			</div>
    			
    			<div id="entidade_div">
    	            <h2>Selecione uma entidade</h2>
                    <select id="entidade" name="entidade" onChange="javascript:setEntidade();">
                    </select>
    			</div>
    
    			<div id="nascimento_div">
    	            <h2>Qual sua data de nascimento?</h2>
                    <input type="date" id="nascimento" name="nascimento" placeholder="dd-mm-yyyy" value="" max="2021-12-31" onkeyup="validate()">
                    <div class="bot-buscar"><a href="#" class="btn-search" onClick="javascript:buscaplanos();">BUSCAR PLANOS</a></div>
                    </select>
    			</div>
    		</form>
        <div id="loadingapi" class="textocarregando">
        <img src="./img/loader.gif" alt="Carregando..." />
        </div> 
    	</div>
    	<div id="quadroresultados">	</div>
    </div>
    
    <div id="footer" class="container-fluid footer">
    		<div class="copyright" style="text-align: center;">
    			© 2021 - <a href="https://amaro.net/planosdesaude/"> ADMINISTRADORA DE BENEFÍCIOS </a> - ® Todos os direitos reservados
    		</div>
    		<ul class="social"></ul>
    </div>
</div>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
</body>
</html>