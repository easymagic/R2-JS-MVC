var R2 = {};
(function(r2){

  function Event_(sender){

  	 this.sender = sender;
  	 this.listeners = [];

  }


  Event_.prototype = {
  
     attach:function(cb){

     	 this.listeners.push(cb);

     },

     notify:function(dt){

     	 for (var i in this.listeners){

     	 	 this.listeners[i](this.sender,dt);

     	 }

     }



  };

  function convert_args(args){

     var arg = [];

     for (var c = 0;c < args.length;c++){

        arg[c] = args[c];

     }

     return arg;

  }


  function Model(cfg){

  	 for (var i in cfg){

      if (typeof(cfg[i]) == 'function'){

          this['on_'+i] = new Event_(this);

          (function(old_fn,obj,evt){


             obj[i] = function(){

               
               var args = convert_args(arguments);

               args.push(evt);

               return old_fn.apply(obj,args);

             };



          })(cfg[i],this,this['on_'+i]);

      }else{
        this[i] = cfg[i];
      }



  	 }
      

  }

  //Model.prototype = new Event_(Model.prototype);



  function Controller(cfg){
   
    for (var i in cfg){

       this[i] = cfg[i];

    }

  }

  function View(cfg){

    for (var i in cfg){

       this[i] = cfg[i];

    }

  }




  r2.Model = {};
  r2.Controller = {};
  r2.View = {};


  r2.models = {};
  r2.controllers = {};
  r2.views = {};


  r2.Model.create = function(name,cfg){
  	
      r2.models[name] = function(){
        return new Model(cfg);
      };
    
  };

  r2.Controller.create = function(name,cfg){
     
     r2.controllers[name] = function(){
       return new Controller(cfg);
     }; 

  };
   

  r2.View.create = function(name,cfg){
     
     r2.views[name] = function(){
        return new View(cfg);
     };

  };





})(R2);



//Excample .....

// R2.Model.create('user',{
//   items:['AKL','CHRITO','JEN-J','AMAKA'],
//   index:-1,
//   edit:function(id,new_name,evt){

//      this.items[id] = new_name;
//      evt.notify(this);

//   },
//   add:function(new_name,evt){

//      this.items.push(new_name);

//      evt.notify(this);

//   },
//   remove:function(id,evt){

//      this.items.splice(id);

//      evt.notify(this);

//   },
//   load_all:function(evt){

//      evt.notify(this);

//   },
//   select:function(id,evt){

//      this.index = id;
//      evt.notify(this);

//   }

// });

// var user_obj = R2.models.user();



// R2.View.create('user_view',{
//   init:function(){

//    var index = -1; 
//    var $cur_el = null;
  
//    function load_list(dt){
//         var tmpl = $('#root');
//         tmpl.html(''); //reset the root tree.
//         $cur_el = null;
//         index = -1;


//          $.each(dt.items,function(k,v){
             
//            var $el = $('<button>' + v  + '</button>');  
//            var $remove = $('<button>Remove</button>')
//            var $parent = $('<div></div');

//            $parent.append($el);
//            $parent.append($remove);

//            $el.on('click',function(){

//                     user_obj.select(k);
//                     index = k;
//                     $cur_el = $(this);

//            });

//            $remove.on('click',function(){
//             if (confirm("You you want to confirm this action?")){

//                user_obj.remove(index);

//             }
//            });

//            tmpl.append($parent);



//          });
//    }


//     user_obj.on_load_all.attach(function(dt){
        
//         load_list(dt);

//     });


//     user_obj.on_add.attach(function(dt){
        
//         load_list(dt);

//     });

//     user_obj.on_remove.attach(function(dt){
        
//         load_list(dt);

//     });




//     user_obj.on_select.attach(function(dt){

//        $('#current_user').val(dt.items[dt.index]);

//     });



//     user_obj.on_edit.attach(function(dt){

//        if ($cur_el != null){
//          $cur_el.html(dt.items[index]);
//        }

//     });


//     $('#add').on('click',function(){
//       user_obj.add($('#current_user').val());
//     });


//     $('#current_user').on('keyup',function(){
//       if (index != -1){ 
//         user_obj.edit(index,$(this).val());
//       } 
//     });


//     user_obj.load_all();




//   }
// });


// var user_view_obj = R2.views.user_view();



// //R2.views.user_view.init();


