this["JST"] = this["JST"] || {};

this["JST"]["board"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<main class=\"board\"><div class=\"lists\"></div><form class=\"add-list list-wrapper\" action=\"#\" method=\"post\"><span class=\"placeholder\">Add a list…</span><div class=\"add-input\"><input type=\"text\" name=\"name\" placeholder=\"Add a list…\"><input class=\"submit-button\" type=\"submit\" value=\"Save\"><a class=\"icon-cross\" href=\"#\"></a></div></form></main>";
},"useData":true});

this["JST"]["card"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"card-labels\">"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.labels : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"2":function(container,depth0,helpers,partials,data) {
    return "<span class=\""
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "\"></span>";
},"4":function(container,depth0,helpers,partials,data) {
    return "<div class=\"card-labels\" style=\"display: none;\"></div>";
},"6":function(container,depth0,helpers,partials,data) {
    return "<span class=\"card-subscription\">watching</span>";
},"8":function(container,depth0,helpers,partials,data) {
    return "<span class=\"card-subscription\" style=\"display: none\">watching</span>";
},"10":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"card-dueDate\"><span>"
    + container.escapeExpression(((helper = (helper = helpers.dueDate || (depth0 != null ? depth0.dueDate : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"dueDate","hash":{},"data":data}) : helper)))
    + "</span></div>";
},"12":function(container,depth0,helpers,partials,data) {
    return "<div class=\"card-dueDate\" style=\"display: none;\"><span></span></div>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.labels : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "<span class=\"card-title\">"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</span><span class=\"edit-card\"></span><div>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.subscribed : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.dueDate : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});

this["JST"]["cards"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"list-cards\"></div><div class=\"cc-controls-section\"><textarea class=\"new-card-title\"></textarea><input class=\"submit-button\" type=\"submit\" value=\"Add\"><a class=\"icon-cross\" href=\"#\"></a></div><a class=\"open-card-composer\" href=\"#\">Add a card…</a>";
},"useData":true});

this["JST"]["list"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<textarea class=\"list-title\">"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"title","hash":{},"data":data}) : helper)))
    + "</textarea>";
},"useData":true});

this["JST"]["modal"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"modal-labels\"><h3>Labels</h3><ul>"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.labels : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul></div>";
},"2":function(container,depth0,helpers,partials,data) {
    return "<li><img src=\"/images/"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + ".png\"></li>";
},"4":function(container,depth0,helpers,partials,data) {
    return "<div class=\"modal-labels\" style=\"display: none\"><h3>Labels</h3><ul></ul></div>";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"modal-dueDate\"><h3>Due Date</h3><p>"
    + container.escapeExpression(((helper = (helper = helpers.dueDate || (depth0 != null ? depth0.dueDate : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"dueDate","hash":{},"data":data}) : helper)))
    + "</p></div>";
},"8":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"modal-dueDate\" style=\"display: none\"><h3>Due Date</h3><p>"
    + container.escapeExpression(((helper = (helper = helpers.dueDate || (depth0 != null ? depth0.dueDate : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"dueDate","hash":{},"data":data}) : helper)))
    + "</p></div>";
},"10":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"description-show\"><h3>Description</h3><a class=\"edit-description\" href=\"#\">Edit</a><p>"
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"description","hash":{},"data":data}) : helper)))
    + "</p></div><a style=\"display: none;\" class=\"add-description\" href=\"#\">Edit the description…</a>";
},"12":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div style=\"display: none;\" class=\"description-show\"><h3>Description</h3><a class=\"edit-description\" href=\"#\">Edit</a><p>"
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"description","hash":{},"data":data}) : helper)))
    + "</p></div><a class=\"add-description\" href=\"#\">Edit the description…</a>";
},"14":function(container,depth0,helpers,partials,data) {
    return "<p>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</p>";
},"16":function(container,depth0,helpers,partials,data) {
    return "<span class=\"on\">On</span>";
},"18":function(container,depth0,helpers,partials,data) {
    return "<span class=\"off\">On</span>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"modal-layer\"></div><div id=\"card-modal\"><div class=\"modal-header\"><span class=\"modal-icon\"></span><textarea class=\"modal-title\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</textarea><div class=\"modal-header-content\"><p>in list <a href=\"#\">"
    + alias4(((helper = (helper = helpers.listTitle || (depth0 != null ? depth0.listTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"listTitle","hash":{},"data":data}) : helper)))
    + "</a></p></div></div><div class=\"modal-main\"><div class=\"modal-detail\">"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.labels : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.dueDate : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "<div class=\"modal-description\">"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.description : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data})) != null ? stack1 : "")
    + "<div class=\"description-control-section\"><textarea class=\"new-card-title description-input\" placeholder=\"Add more detailed descriptions\"></textarea><input class=\"submit-button\" type=\"submit\" value=\"Save\"><a class=\"icon-cross\" href=\"#\"></a></div></div></div><div class=\"modal-comments\"><span class=\"modal-comment-icon\"></span><h3>Comments</h3><textarea></textarea><input class=\"submit-button\" type=\"submit\" value=\"Save\"></div><div class=\"modal-activities\"><span class=\"modal-activities-icon\"></span><h3>Activities</h3><div class=\"activity-list\">"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.comments : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div></div></div><div class=\"modal-sidebar\"><div class=\"modal-add\"><h2>Add</h2><ul><li class=\"labels\"><h3>Labels</h3></li><div class=\"show-labels\"><h4>Labels</h4><a href=\"#\" id=\"yellow\"><img src=\"/images/yellow.png\"></a><a href=\"#\" id=\"orange\"><img src=\"/images/orange.png\"></a><a href=\"#\" id=\"red\"><img src=\"/images/red.png\"></a></div><li class=\"show-dueDate\"><h3>Due Date</h3></li><div id=\"date-picker\" style=\"display: none\"><h4>Change Due Date</h4><dl><dt><label for=\"date\">Date</label></dt><dd><input type=\"text\" name=\"date\" id=\"date\"></dd></dl><dl><dt><label for=\"time\">Time</label></dt><dd><input type=\"text\" name=\"time\" id=\"time\"></dd></dl><div class=\"picker-console\"><input class=\"submit-button\" type=\"submit\" value=\"Save\"><input class=\"submit-button\" type=\"submit\" value=\"Remove\"></div></div></ul></div><div class=\"modal-actions\"><h2>Actions</h2><ul><li class=\"action-move\">Move</li><div class=\"modal-move\" style=\"display:none\"><h4>Move card</h4><dl><dt><label for=\"listMoved\">List</label></dt><dd><input type=\"number\" name=\"listMoved\" id=\"listMoved\"></dd></dl><dl><dt><label for=\"positionMoved\">Position</label></dt><dd><input type=\"number\" name=\"positionMoved\" id=\"positionMoved\"></dd></dl><input type=\"submit\" class=\"submit-button\" value=\"Move\"></div><li class=\"action-copy\">Copy</li><div class=\"modal-copy\" style=\"display: none;\"><h4>Copy card</h4><dl><dt><label for=\"newTitle\">Title</label></dt><dd><input type=\"text\" name=\"newTitle\" id=\"newTitle\"></dd></dl><h5>Copy to ..</h5><dl><dt><label for=\"listCopy\">List</label></dt><dd><input type=\"number\" name=\"listCopy\" id=\"listCopy\"></dd></dl><dl><dt><label for=\"positionCopy\">Position</label></dt><dd><input type=\"number\" name=\"positionCopy\" id=\"positionCopy\"></dd></dl><input type=\"submit\" class=\"submit-button\" value=\"Copy\"></div><li class=\"action-subscribe\">Subscribe"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.subscribed : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.program(18, data, 0),"data":data})) != null ? stack1 : "")
    + "</li><li class=\"action-delete\">Delete</li></ul></div></div></div>";
},"useData":true});

this["JST"]["notifications"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<li>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</li>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<h3>Notifications</h3><ul>"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.notifications : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});

this["JST"]["topBar"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<ul><li><span class=\"top-notifications\">N</span></li></ul>";
},"useData":true});