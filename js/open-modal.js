
         var modal = document.getElementById("modalFiltro");
         modal.style.display = "none";
         
         var btn = document.getElementById("btnFiltroModal");
         
         var span = document.getElementsByClassName("close")[0];
          
         btn.onclick = function() {
           modal.style.display = "flex";
         }
         
         span.onclick = function() {
           modal.style.display = "none";
         }
         
         window.onclick = function(event) {
           if (event.target == modal) {
             modal.style.display = "none";
           }
         }