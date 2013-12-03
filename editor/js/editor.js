var stage, groupBackground, layer,images = {},messageLayer;

function writeMessage(messageLayer, message) {
    var context = messageLayer.getContext();
    messageLayer.clear();
    context.font = "18pt Calibri";
    context.fillStyle = "black";
    context.fillText(message, 10, 25);
}

function update(group, activeAnchor) {

    var topLeft = group.get(".topLeft")[0];
    var topRight = group.get(".topRight")[0];
    var bottomRight = group.get(".bottomRight")[0];
    var bottomLeft = group.get(".bottomLeft")[0];
    var image = group.get(".image")[0];

    // update anchor positions
    switch (activeAnchor.getName()) {
    case "topLeft":
        topRight.attrs.y = activeAnchor.attrs.y;
        bottomLeft.attrs.x = activeAnchor.attrs.x;
        if (topLeft.attrs.x >= topRight.attrs.x) {
            return;
        }
        break;
    case "topRight":
        topLeft.attrs.y = activeAnchor.attrs.y;
        bottomRight.attrs.x = activeAnchor.attrs.x;
        if (topRight.attrs.x <= topLeft.attrs.x) {
            return;
        }
        break;
    case "bottomRight":
        bottomLeft.attrs.y = activeAnchor.attrs.y;
        topRight.attrs.x = activeAnchor.attrs.x;
        if (bottomLeft.attrs.x >= topRight.attrs.x) {
            return;
        }
        break;
    case "bottomLeft":
        bottomRight.attrs.y = activeAnchor.attrs.y;
        topLeft.attrs.x = activeAnchor.attrs.x;
        if (bottomRight.attrs.x <= topLeft.attrs.x) {
            return;
        }
        break;
    }

    image.setPosition(topLeft.attrs.x, topLeft.attrs.y);
    image.setSize(topRight.attrs.x - topLeft.attrs.x, bottomLeft.attrs.y - topLeft.attrs.y);
}

function addAnchor(group, x, y, name) {
    var stage = group.getStage();
    var layer = group.getLayer();

    var anchor = new Kinetic.Circle({
        x: x,
        y: y,
        stroke: "transparent",
        //stroke: "blue",
        fill: "transparent",
        strokeWidth: 2,
        radius: 10,
        name: name,
        draggable: true,
        dragBounds: {
            top: 10,
            right: stage.getWidth() - 10,
            bottom: 450,
            left: 10
        }
    });

    anchor.on("dragmove", function () {
        update(group, this);
        layer.draw();
    });
    anchor.on("mousedown", function () {
        group.draggable(false);
        this.moveToTop();
    });
    anchor.on("dragend", function () {
        group.draggable(true);
        layer.draw();
    });
    // add hover styling
    anchor.on("mouseover", function () {

        var layer = this.getLayer();
        document.body.style.cursor = "move";
        this.setStrokeWidth(4);
        this.setStroke("#FF0000");
        fill: "#000";
        strokeWidth: 2;
        radius: 8;
        layer.draw();
    });

    anchor.on("mouseout", function () {
        var layer = this.getLayer();
        document.body.style.cursor = "default";
        this.setStrokeWidth(2);
        this.setStroke("transparent");

        layer.draw();
    });

    group.add(anchor);

}

function loadImages(sources, callback) {
    var loadedImages = 0;
    var numImages = Object.keys(sources).length;

    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}

function initStage(images) {

    stage = new Kinetic.Stage({
        container: "container",
        width: 691,
        height: 440
    });

    groupBackground = new Kinetic.Group({
        x: 0,
        y: 0,
        draggable: false
    });
    layer = new Kinetic.Layer();
	
	// add the shapes to the layer
    layer.add(groupBackground);
    stage.add(layer);


    messageLayer = new Kinetic.Layer();
    stage.add(messageLayer);
	
	var imageDefaultBackground = new Kinetic.Image({
        x: 0,
        y: 0,
        image: images.default_background,
        width: 691,
        height: 450,
        name: "image"
    });

    groupBackground.add(imageDefaultBackground);

    stage.draw();
}

function addClip(imgObj) {

	var layer = new Kinetic.Layer();
	var imageObj = new Image();
	
	imageObj.onload = function () {
		var image = new Kinetic.Image({
			x: stage.getWidth() / 2 - 53,
			y: stage.getHeight() / 2 - 59,
			image: imageObj,
			width: 106,
			height: 118,
			draggable: true
		});
		// add the shape to the layer
		layer.add(image);

		// add the layer to the stage
		stage.add(layer);

		image.on("mouseover", function () {
			var imagelayer = this.getLayer();
			document.body.style.cursor = "move";
			this.setStrokeWidth(1);
			this.setStroke("#000000");
			layer.draw();
		});
		image.on("mouseout", function () {
			var imagelayer = this.getLayer();
			document.body.style.cursor = "default";
			this.setStrokeWidth(0);
			this.setStroke("transparent");
			layer.draw();
		});
		image.on("dblclick dbltap", function () {
			layer.remove(image);
			layer.clear();
			layer.draw();
		});
	};
	
	imageObj.src = imgObj.attr('src');

}

function widthHack(){
	var value = $('#texts').val();
	$("p#textcount").text(value);
	var fontid =  $('#fontfam').val();
	$("p#textcount").css("font-family", fontid);
	var color =  $('#colour').val();
	$("p#textcount").css("color", color); 
}


    function addText() {
		
        var text2 = $('#texts').val();
        var fontfam = $('#fontfam').val();
        var colour = $('#colour').val();
        var textstroke = $('#textstroke').val();
		
		widthHack();
		
        var width = $("#textcount")[0].clientWidth;
        var height = $("#textcount")[0].clientHeight;

        var length = text2.length;
        var rectwidth = width;

        var shapesLayer = new Kinetic.Layer();
        //add group
        var group = new Kinetic.Group({
            draggable: true
        });

        if (font == undefined) {
            var font = 30;
        }

        if (x == undefined) {
            var x = 250;
        }

        if (y == undefined) {
            var y = 55;
        }
        var complexText = new Kinetic.Text({
            x: x,
            y: y,
            text: text2,
            fontSize: font,
            fontFamily: fontfam,
            fill: colour,
            textStroke: textstroke,
        });

        stage.add(shapesLayer);

        if (rectheight == undefined) {
            var rectheight = 50;
        }

        if (rectwidth == undefined) {
            var rectwidth = 250;
        }

        var rectx = 250;
        var recty = 40;


        var rect = new Kinetic.Rect({
            x: rectx,
            y: recty,
            width: rectwidth,
            height: rectheight,
            fill: "transparent",
            stroke: "black",
            strokeWidth: 1
        });


        var recttrx = width + 243;
        var recttry = 32;
        var recttr = new Kinetic.Rect({
            x: recttrx,
            y: recttry,
            width: 15,
            height: 15,
            fill: "black",
            stroke: "red",
            strokeWidth: 1
        });

        var rectbrx = width + 243;
        var rectbry = 82;
        var rectbr = new Kinetic.Rect({
            x: rectbrx,
            y: rectbry,
            width: 15,
            height: 15,
            fill: "black",
            stroke: "red",
            strokeWidth: 1
        });

        var recttlx = 243;
        var recttly = 32;
        var recttl = new Kinetic.Rect({
            x: recttlx,
            y: recttly,
            width: 15,
            height: 15,
            fill: "black",
            stroke: "red",
            strokeWidth: 1
        });

        var rectblx = 243;
        var rectbly = 82;
        var rectbl = new Kinetic.Rect({
            x: rectblx,
            y: rectbly,
            width: 15,
            height: 15,
            fill: "black",
            stroke: "red",
            strokeWidth: 1
        });

        rect.on("mouseover dragmove", function () {
            var shapesLayer = this.getLayer();
            document.body.style.cursor = "move";
            recttl.setFill("black");
            recttl.setStroke("red");
            rectbl.setFill("black");
            rectbl.setStroke("red");
            rectbr.setFill("black");
            rectbr.setStroke("red");
            recttr.setFill("black");
            recttr.setStroke("red");
            rect.setStrokeWidth(1);
            rect.setStroke("black");
            shapesLayer.draw();
        })
		
		
        rect.on("mouseout", function () {
            var shapesLayer = this.getLayer();
            document.body.style.cursor = "default";
            recttl.setFill("transparent");
            recttl.setStroke("transparent");
            rectbl.setFill("transparent");
            rectbl.setStroke("transparent");
            rectbr.setFill("transparent");
            rectbr.setStroke("transparent");
            recttr.setFill("transparent");
            recttr.setStroke("transparent");
            rect.setStrokeWidth(0);
            rect.setStroke("transparent");
            shapesLayer.draw();
            writeMessage(messageLayer, "");
        })


        complexText.on("mouseover dragmove", function () {
            var shapesLayer = this.getLayer();
            document.body.style.cursor = "move";
            recttl.setFill("black");
            recttl.setStroke("red");
            rectbl.setFill("black");
            rectbl.setStroke("red");
            rectbr.setFill("black");
            rectbr.setStroke("red");
            recttr.setFill("black");
            recttr.setStroke("red");
            rect.setStrokeWidth(1);
            rect.setStroke("black");
            shapesLayer.draw();
            
        })
        complexText.on("mouseout", function () {
            var shapesLayer = this.getLayer();
            document.body.style.cursor = "default";
            recttl.setFill("transparent");
            recttl.setStroke("transparent");
            rectbl.setFill("transparent");
            rectbl.setStroke("transparent");
            rectbr.setFill("transparent");
            rectbr.setStroke("transparent");
            recttr.setFill("transparent");
            recttr.setStroke("transparent");
            rect.setStrokeWidth(0);
            rect.setStroke("transparent");
            shapesLayer.draw();
            writeMessage(messageLayer, "");
        });
		
        group.add(complexText);
        group.add(rectbl);
        group.add(recttr);
        group.add(rectbr);
        group.add(recttl);
        group.add(rect);
        shapesLayer.add(group);
        shapesLayer.draw();

        //bottom right square move start
        rectbr.on("mousedown.event1 dragmove", function () {
            var shapesLayer = this.getLayer();
            rectbr.moveToTop();
            document.body.style.cursor = "nw-resize";
            rectbr.setFill("red");
            var mousePos = stage.getMousePosition();
            var xpos = mousePos.x;
            var ypos = mousePos.y;
            shapesLayer.draw();
            //drag br
            group.on("dragmove.event2", function () {
                var shapesLayer = this.getLayer();
                document.body.style.cursor = "nw-resize";
                rectbr.setFill("blue");
                //start  mouse position and font size 
                var dragmousePos = stage.getMousePosition();
                var dragxpos = dragmousePos.x;
                var dragypos = dragmousePos.y;

                if (dragypos > ypos) //drag increase
                {
                    if (font > 50) {
                        complexText.setFontSize(50);
                        writeMessage(messageLayer, "Maximum Font Size Reached");
                        complexText.setFontSize(font);
                    } else {
                        font = (font + 1);

                        complexText.setFontSize(font);
                        var textwidth = complexText.getTextWidth();
                        rectwidth = (textwidth);
                        rectbrx = 244 + textwidth;
                        recttrx = 244 + textwidth;
                        x = x + 0;
                        y = y - 0.5;

                        complexText.setPosition(x, y);
                        rect.setWidth(rectwidth);
                        rect.setHeight(rectheight);
                        rectbr.setPosition(rectbrx, rectbry);
                        rectbl.setPosition(rectblx, rectbly);
                        recttl.setPosition(recttlx, recttly);
                        recttr.setPosition(recttrx, recttry);
                        rect.setPosition(rectx, recty);
                        writeMessage(messageLayer, "");
                    }
                }
                if (dragypos < ypos) //drag increase
                {

                    if (font < 21) {
                        complexText.setFontSize(20);
                        writeMessage(messageLayer, "Minimum Font Size Reached");
                        complexText.setFontSize(font);
                    } else {
                        font = (font - 1);

                        complexText.setFontSize(font);
                        var textwidth = complexText.getTextWidth();
                        rectwidth = (textwidth);
                        rectbrx = rectblx + textwidth;
                        recttrx = recttlx + textwidth;
                        x = x + 0;
                        y = y + 0.5;

                        complexText.setPosition(x, y);
                        rect.setWidth(rectwidth);
                        rect.setHeight(rectheight);
                        rectbr.setPosition(rectbrx, rectbry);
                        rectbl.setPosition(rectblx, rectbly);
                        recttl.setPosition(recttlx, recttly);
                        recttr.setPosition(recttrx, recttry);
                        rect.setPosition(rectx, recty);
                        writeMessage(messageLayer, "");
                    }
                }
                shapesLayer.draw();
            })
        })
        //end bottom right square

        //end square
        rect.on("dblclick", function () {
			deleteText(this.getLayer());
        });

        complexText.on("dblclick", function () {
            deleteText(this.getLayer());            
        });
		
		function deleteText(shapesLayer){
			group.remove(complexText);
            group.remove(rect);
            group.remove(recttl);
            group.remove(recttr);
            group.remove(rectbl);
            group.remove(rectbr);
            shapesLayer.clear();
            shapesLayer.draw();
		}
		
		
        //start dragging
        group.on("dragend", function () {
            rectbr.off("dragmove.event1");
            group.off("dragmove.event2");
            document.body.style.cursor = "default";
        }, false)


        group.on("dragend", function () {
            rectbl.off("dragmove.event1");
            group.off("dragmove.event2");
            document.body.style.cursor = "default";
        }, false)

        group.on("dragend", function () {
            recttl.off("dragmove.event1");
            group.off("dragmove.event2");
            document.body.style.cursor = "default";
        }, false)

        group.on("dragend", function () {
            recttr.off("dragmove.event1");
            group.off("dragmove.event2");
            document.body.style.cursor = "default";
        }, false)
        //end dragging

        rectbr.on("mouseout", function () {
            var shapesLayer = this.getLayer();
            rectbr.setFill("#black");
            rectbr.off("dragmove.event1");
            group.off("dragmove.event2");
            document.body.style.cursor = "default";
            shapesLayer.draw();
        })
        
        rectbr.on("mouseover dragmove", function () {
            var shapesLayer = this.getLayer();
            rect.setStrokeWidth(1);
            rect.setStroke("black");
            recttl.setFill("black");
            recttl.setStroke("red");
            rectbl.setFill("black");
            rectbl.setStroke("red");
            rectbr.setFill("black");
            rectbr.setStroke("red");
            recttr.setFill("black");
            recttr.setStroke("red");
            rect.setStrokeWidth(1);
            rect.setStroke("black");
            shapesLayer.draw();
        })

       

        rectbr.on("mouseout", function () {
            var shapeslayer = this.getLayer();
            recttl.setFill("transparent");
            recttl.setStroke("transparent");
            rectbl.setFill("transparent");
            rectbl.setStroke("transparent");
            rectbr.setFill("transparent");
            rectbr.setStroke("transparent");
            recttr.setFill("transparent");
            recttr.setStroke("transparent");
            rect.setStrokeWidth(0);
            rect.setStroke("transparent");
            shapesLayer.draw();
        })

        shapesLayer.add(group);	
    }
    //end text editor

    //addAnchor(darthVaderGroup, 0, 0, "topLeft");
    //addAnchor(darthVaderGroup, 300, 0, "topRight");
    //addAnchor(darthVaderGroup, 300, 320, "bottomRight");
    //addAnchor(darthVaderGroup, 0, 320, "bottomLeft");

$(function(){
    var sources = {
        default_background: "images/default_background.jpg"
    };
    loadImages(sources, initStage);
	
	$('#save').click(function () {
        stage.toDataURL(function (dataUrl) {
            $.post("ajax.php", {
                    data: dataUrl
                },
                function (data) {
                    alert("Your Design Was Saved To The Server");
                });
        });
    });
	
	$("#preview").click(function () {
		stage.toDataURL({ 
			callback: function(dataUrl) {
				window.open(dataUrl);
			}
		});
    });

    $("ul#img a").click(function () {
        addClip($('img', this));
    });
	
	$("#textsubmit").click(function () {
        addText();
    });

});