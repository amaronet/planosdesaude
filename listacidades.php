<?
function select_distinct($table,$field,$where) {
    $conecta = mysqli_connect("localhost", "usuario_banco", "senha_usuario_banco", "nome_do_banco") or die(mysqli_error());
    $query = "SELECT DISTINCT $field FROM $table where $where order by 1 limit 7";
    //echo $query;
	$result=mysqli_query($conecta,$query) or die(mysqli_error($conecta));
    return $result;
}

$estados = array( "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RO", "RS", "RR", "SC", "SE", "SP", "TO" );

$n = strlen($_GET['word']); 

$word = utf8_decode($_GET['word']);

if($n>=3)
{

	$sel=select_distinct("cidades","nom_cidade, cod_cidade, cod_estado", "nom_cidade like '$word%'");
	while($res=mysqli_fetch_object($sel))
	{
		if($res->nom_cidade!=$word)
		{
		    $uf = $res->cod_estado;
			echo $res->cod_cidade.'|'.utf8_encode($res->nom_cidade)." - ".$estados[$uf]."\n";
		}
    }
}

?>