$(".textarea-wrap textarea").each(function() {
	$(this).addClass("code");
	$('<pre draggable="true" contenteditable="false"></pre>').insertBefore($(this));
});
$(".textarea-wrap textarea").promise().done(function() {
	$(".code").each(function() {
		var t = $(this).val();
		$(this).prev("pre").text(t).each(function() {
		var h = $(this).outerHeight();
		$(this).addClass("prettyprint");
		if(h>120) {
		$(this).addClass("minHeight");
		$('<div class="pretoolbar"><span class="selectcode"> </span> <span class="toggleContenteditable"> </span> <span class="openPopup"> </span> <span class="pre-maxHeight-toggle"> </span></div>').insertBefore($(this));
		}
		else {
		$('<div class="pretoolbar"><span class="selectcode"> </span> <span class="toggleContenteditable"> </span> <span class="openPopup"> </span></div>').insertBefore($(this));
		}
		});
		$("pre").promise().done(function() {
		 window.prettyPrint && prettyPrint();
		});
	});	
	$(".pre-maxHeight-toggle").click(function() {
	$(this).parent(".pretoolbar").next("pre").toggleClass("maxHeight").toggleClass("minHeight");
	});
	$(".selectcode").click(function() {
	var t = $(this).parent(".pretoolbar").next("pre").text();
	var h = $(this).parent(".pretoolbar").next("pre").height();
	var h = h+"px";
	$(this).parent(".pretoolbar").next("pre").hide().next("textarea").css('height', h).val(t).show().focus().select();
	});
	$(".toggleContenteditable").click(function() {
	$(this).parent(".pretoolbar").next("pre").attr("contenteditable", "true").attr("draggable", "false");
	});
	$(".openPopup").click(function() {
        var w = window.open('', '', 'width=400,height=400,resizeable,scrollbars');
        var x=$(this).parent(".pretoolbar").next("pre").html();
        w.document.write(x);
        w.document.close();
   });
});
$(".textarea-wrap textarea").blur(function() {
	var layer = $(this);
	setTimeout(function() {
	layer.hide().prev("pre").show();
	},1000);
});
$(".textarea-wrap pre").blur(function() {
	var layer = $(this);
	setTimeout(function() {
	if(layer.is(":focus")) {
	}
	else {
	layer.attr("contenteditable", "false").attr("draggable", "true").fadeTo(100, 0).delay(100).fadeTo(900, 1);
	}
	},1000);
});

