var abi;
$.ajax({
        url: "abi.json",
        dataType: "text",
        async: true,
        success: function(msg){
            abi = msg;
            alert('���������� �����: '+ abi);
        }
    });
alert(abi);
