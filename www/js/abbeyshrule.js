//
// News WordPress JSON Feed
//
function listPosts(data) {
	var output='<ul data-role="listview" data-filter="true">';
	$.each(data.posts,function(key,val){
		
		var tempDiv = document.createElement("tempDiv");
		tempDiv.innerHTML = val.excerpt;
		$("a",tempDiv).remove();
		var excerpt = tempDiv.innerHTML;
		
		output += '<li>';
		output += '<a href="#newspost" onclick="showPost(' + val.id + ')" >';
		output += '<h3>' + val.title + '</h3>';
		
		output += (val.thumbnail) ? 
			'<img src="' + val.thumbnail + '" alt="' + val.title + '" />'  :
			'<img src="images/avlogo.png" alt="View Source Logo" />';
		output += '<p>' + excerpt + '</p>';
		output += '</a>';
		output += '</li>';
	}); // go through each post
	output+='</ul>';
	$('#postlist').html(output);
} // lists all the posts

function showPost(id) {
	$.getJSON('http://www.abbeyshruletidyvillages.ie/news/?json=get_post&post_id=' + id + '&callback=?', 
		function name(data) {
			var output = '';
			output += '<h3>' + data.post.title + '</h3>';
			output += data.post.content;
			$('#mypost').html(output);
	});
}

//
// Video YouTube JSON Feed
//
function listVideos(data) {
	var output='';
    // loop through data
	for (var i=0; i<data.feed.entry.length; i++) {
		
        // video title
		var title = data.feed.entry[i].title.$t;
        // video thumbnail
		var thumbnail = data.feed.entry[i].media$group.media$thumbnail[0].url;
        // video description
		var description = data.feed.entry[i].media$group.media$description.$t;
        // video id
		var id = data.feed.entry[i].id.$t.substring(38);
		
		// insert videos into either col a or b depending on remainder
        var blocktype = ((i % 2) === 1) ? 'b' : 'a';
		
		output += '<div class="ui-block-' + blocktype + '">';
        // when video is clicked go to videoplayer page 
		output += '<a href="#videoplayer" data-transition-"fade" onclick="playVideo(\'' + id + '\',\'' + title + '\',\'' + escape(description) + '\')">';
		output += '<h3 class=""movivetitle">' + title + '</h3>';
		output += '<img src="' + thumbnail + '" alt="' + title + '" />';
		output += '</a>'
		output += '</div>';
		}
	$('#videolist').html(output);
}
	// Video player page... get id, title and descr
	function playVideo(id, title, description) {
		var output ='<iframe src="http://www.youtube.com/embed/'+ id +'?wmode=transparent&amp;HD=0&amp;rel=0&amp;loop=0&amp;showinfo=0&amp;controls=1&amp;autoplay=0" frameborder="0" allowfullscreen></iframe>';
		output += '<h3>' + title + '</h3>';
		output += '<p>' + unescape(description) + '</p>';
		$('#myplayer').html(output);
		
	}
	
//
// Photo Flicker JSON Feed
//
function jsonFlickrFeed(data){
	console.log(data);
	var output='';
	
	// Loop through data
	for (var i = 0; i < data.items.length; i++){
		// insert title into the variable title
		var title = data.items[i].title;
		// Get location of the image and get a substring of m to change it to a 150 x 150px
		var link = data.items[i].media.m.substring(0,56);
		// modulas function to insert images into a, b or c
		var blocktype = 
				((i%3)===2) ? 'c':
				((i%3)===1) ? 'b':
				'a';
		// output the image, link and blocktype		
		output += '<div class="ui-block-' + blocktype + '">';
		// show image when clicked in the page showphoto
		output += '<a href="#showphoto" data-transition="fade" onclick="showPhoto(\'' + link + '\',\'' + title + '\')">';
		output += '<img src="' + link + '_q.jpg" alt="' + title + '" />';
		output +='</a>';
		output +='</div>';
		
		} // go through data
		
		// output to html
		$('#photolist').html(output);
		
	} // Json filicker feed
	
// function to show image on showPotopage
function showPhoto(link,title){
	// when photo is clicked go back to photos page
	var output='<a href="#photos" data-transition="fade">';
	output += '<img src ="' + link + '_b.jpg" alt="' + title + '" />';
	output += '</a>';
	$('#myphoto').html(output);
} 

//
// Contact Form Validation
//
function formValidator(){
	// References to fields
	var firstname = document.getElementById('firstname');
	var email = document.getElementById('email');
	
	// Check each input
	if(isAlphabet(firstname)){
		if(emailValidator(email)){
							return true;	
		}
	}
	return false;
}
// Name Verification using Reg. Exp.
function isAlphabet(elem){
	var alphaExp = /^[a-zA-Z]+$/;
	var name = document.getElementById('name');
	if(elem.value.match(alphaExp)){
		return true;
	}else{
	// if false output 'Invalid Name'
		name.innerHTML = "Invalid Name";
		name.style.color="red";
		elem.focus();
		return false;
	}
}
// Email Verification using Reg. Exp.
function emailValidator(elem){
	var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
	var emailmsg = document.getElementById('emailmsg');
	if(elem.value.match(emailExp)){
		return true;
	}else{
		// if false output 'Invalid Email'
		emailmsg.innerHTML = "Invalid Email";
		emailmsg.style.color="red";
		elem.focus();
		return false;
	}
}



// alert dialog dismissed
function alertDismissed() {
    // do something
}

// Show a custom alert
//
function showAlertName() {
    navigator.notification.alert(
                                 'No Numbers Allowed',  // message
                                 alertDismissed,         // callback
                                 'Please Enter Vaild Name',            // title
                                 'Done'                  // buttonName
                                 );
}

function showAlertEmail() {
    navigator.notification.alert(
                                 '',  // message
                                 alertDismissed,         // callback
                                 'Please Enter Vaild Email Address',            // title
                                 'Done'                  // buttonName
                                 );
}


