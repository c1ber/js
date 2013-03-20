
(function($) {
	
	//Global Static Class
	$.jPlug = {
		version: '1.0',
		//Global Static Fucntion[call $.jPlug.about() from anywhere]
		about: function() {
			alert("jPlug");
		}
	};
	
	
	//Global Function[call restoreMsg() from anywhere]
	restoreMsg=function(){
		alert("Restoring...");
	}
	
	//jQuery Object-wise fucntions[call $("#something").restoreMe() from anywhere, restoreMe() alone can't be called]
	$.fn.extend({
		hideMe: function() {
			alert("hide");
			this.hide();
			return this;
		},
		showMe: function() {
			alert("show");
			this.show();
			return this;
		},	
		restoreMe: function() {			
			borray=this.data("myBorder");
			bor=borray.pop();
			if(bor!=null){
				restoreMsg();
				this.css("border","1px solid");
				this.css("borderColor",bor);
				this.data("myBorder",borray);
			}
			return this;
		}
	});
	
	//Primary Initialization Function[call $(".some").jPlug({name:'somenname',border:'someborder'}) from anywhere]
	$.fn.jPlug = function(settings) {
	
		var $this=$(this);		
		
		var defaults = {
			name:  "jPlug",
			border: "red"
		};
		
		if(settings)
			settings = $.extend(defaults, settings);
		//$.extend(this, defaults, settings);	

		function hi(msg){
			alert(msg);
		}		
		
		return this.each(
			function(){
				var borray=$(this).data("myBorder")||[];
				borray.push($(this).css("borderTopColor"));	
				$(this).data("myBorder",borray);
				$(this).css("border","1px solid");				
				if(settings)
					$(this).css("borderColor",settings.border);
			}
		);
	};
})(jQuery);
