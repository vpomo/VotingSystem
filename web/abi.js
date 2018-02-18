var abi;
$.ajax({
        url: "abi.json",
        dataType: "text",
        async: true,
        success: function(msg){
            abi = msg;
            alert('Содержимое файла: '+ abi);
        }
    });
alert(abi);
