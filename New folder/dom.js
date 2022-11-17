window.addEventListener("load",fetchItems())
function fetchItems()
{
    document.getElementById("answered").innerHTML=localStrage.getItem("ans");
document.getElementById("correct").innerHTML=localStrage.getItem("cor");
document.getElementById("wrong").innerHTML=localStrage.getItem("wro");
document.getElementById("score").innerHTML=localStrage.getItem("sco");
}