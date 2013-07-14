function validateForm(){
    var x=document.forms["new_class"]["subject"].value;
    var y=document.forms["new_class"]["class"].value;
    
    if (x==null || x==""){
        alert("Pleace enter a valid Subject name.");
        return false;
    }
    if (y==null || y==""){
        alert("Pleace enter a valid Class name.");
        return false;
    }
}