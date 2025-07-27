// SIDEBAR
const menuItems = document.querySelectorAll('.menu-item');

//MESSAGES
const messagesNotification = document.querySelector('#messages-notification');
const messages = document .querySelector('.messages');
const message = messages.querySelectorAll('.message');
const messageSearch = document.querySelector('#message-search');

//THEME
const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customize-theme');
const fontSizes = document.querySelectorAll('.choose-size span');
var root = document.querySelector(':root');
const colorPalette = document.querySelectorAll('.choose-color span');
const Bg1 = document.querySelector('.bg-1');
const Bg2 = document.querySelector('.bg-2');
const Bg3 = document.querySelector('.bg-3');



//=====================SIDEBAR====================

//remove active class from all menu items
const changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    })
}

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active');
        if(item.id != 'notifications'){
            document.querySelector('.notification-popup').
            style.display = 'none';
        } else{
            document.querySelector('.notification-popup').
            style.display = 'block';
            document.querySelector('#notifications .notification-count').style.display = 'none';
        }
    })
})


//======================MESSAGES=====================
//searches chats
const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
    message.forEach(user => {
        let name = user.querySelector('h5').textContent.toLowerCase();
        if(name.indexOf(val) != -1){
            user.style.display = 'flex';
        } else{
            user.style.display = 'none';
        }
    })
}

//search chat
messageSearch.addEventListener('keyup', searchMessage);

//highlight messages card when messages menu item is clicked
messagesNotification.addEventListener('click', () => {
    messages.style.boxShadow = '0 0 1rem var(--color-primary)';
    messagesNotification.querySelector('.notification-count').style.display = 'none';
    setTimeout(() => {
        messages.style.boxShadow = 'none';
    }, 2000);
})


//THEME DISPLAY CUSTOMIZATION

//opens modal
const openThemeModal = () => {
    themeModal.style.display = 'grid';
}

//close modal
const closeThemeModal = (e) => {
    if(e.target.classList.contains('customize-theme')){
        themeModal.style.display = 'none';
    }
}


//close modal
themeModal.addEventListener('click', closeThemeModal);

theme.addEventListener('click', openThemeModal);



//======================FONTS========================

//remove active class from spans or font size selectors
const removeSizeSelector = () => {
    fontSizes.forEach(size => {
        size.classList.remove('active');
    })
}

fontSizes.forEach(size => {
    size.addEventListener('click', () => {
         removeSizeSelector();
         let fontSize;
         size.classList.toggle('active');

        if(size.classList.contains('font-size-1')){
        fontSize = '10px';
        root.style.setProperty('--sticky-top-left', '5.4rem');
        root.style.setProperty('--sticky-top-right', '5.4rem');
    } else if(size.classList.contains('font-size-2')){
        fontSize = '13px';
        root.style.setProperty('--sticky-top-left', '5.4rem');
        root.style.setProperty('--sticky-top-right', '-7rem');
    } else if(size.classList.contains('font-size-3')){
        fontSize = '16px';
        root.style.setProperty('--sticky-top-left', '-2rem');
        root.style.setProperty('--sticky-top-right', '-17rem');
    } else if(size.classList.contains('font-size-4')){
        fontSize = '19px';
        root.style.setProperty('--sticky-top-left', '-5rem');
        root.style.setProperty('--sticky-top-right', '-25rem');
    } else if(size.classList.contains('font-size-5')){
        fontSize = '22px';
        root.style.setProperty('--sticky-top-left', '-12rem');
        root.style.setProperty('--sticky-top-right', '-35rem');
    }

     //change font size of the root html element
    document.querySelector('html').style.fontSize = fontSize;
   })
     
})


//remove active class from colors
const changeActiveColorClass = () => {
    colorPalette.forEach(colorPicker => {
        colorPicker.classList.remove('active');
    })
}

//change primary colors
colorPalette.forEach(color => {
    color.addEventListener('click', () => {
        let primary;
        //remove active class from colors
        changeActiveColorClass();

        if(color.classList.contains('color-1')){
            primaryHue = 252;
        } else if(color.classList.contains('color-2')){
            primaryHue = 52;
        } else if(color.classList.contains('color-3')){
            primaryHue = 352;
        } else if(color.classList.contains('color-4')){
            primaryHue = 152;
        } else if(color.classList.contains('color-5')){
            primaryHue = 202;
        }
        color.classList.add('active');

        root.style.setProperty('--primary-color-hue', primaryHue);
    })
})


//theme BACKGROUND values
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

//changes background color
const changeBG = () => {
    root.style.setProperty('--light-color-lightness', lightColorLightness);
    root.style.setProperty('--white-color-lightness', whiteColorLightness);
    root.style.setProperty('--dark-color-lightness', darkColorLightness);
}

//change background colors
Bg1.addEventListener('click', () => {
    //add active class
    Bg1.classList.add('active');
    //remove active class from the others
    Bg2.classList.remove('active');
    Bg3.classList.remove('active');
    //remove customized changes from local storage
    window.location.reload();
});



Bg2.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '20%';
    lightColorLightness = '15%';

    //add active class
    Bg2.classList.add('active');
    //remove active class from the others
    Bg1.classList.remove('active');
    Bg3.classList.remove('active');
    changeBG();
});

Bg3.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '10%';
    lightColorLightness = '0%';

    //add active class
    Bg3.classList.add('active');
    //remove active class from the others
    Bg1.classList.remove('active');
    Bg2.classList.remove('active');
    changeBG();
});

// ===================== ADDITIONAL FUNCTIONALITY =====================

// LIKE/UNLIKE POSTS
const likeButtons = document.querySelectorAll('.fa-heart');

likeButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('fa-regular');
        button.classList.toggle('fa-solid');
        button.classList.toggle('liked');
        
        // Update like count text (simplified example)
        const likesElement = button.closest('.feed').querySelector('.liked-by p');
        if (button.classList.contains('liked')) {
            likesElement.textContent = likesElement.textContent.replace(/(\d+)/, (match) => {
                return parseInt(match) + 1;
            });
        } else {
            likesElement.textContent = likesElement.textContent.replace(/(\d+)/, (match) => {
                return parseInt(match) - 1;
            });
        }
    });
});

// BOOKMARK POSTS
const bookmarkButtons = document.querySelectorAll('.fa-bookmark');

bookmarkButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('fa-regular');
        button.classList.toggle('fa-solid');
    });
});

// FOLLOW/UNFOLLOW USERS IN STORIES
const storyFollowButtons = document.querySelectorAll('.story:not(:first-child)');

storyFollowButtons.forEach(story => {
    story.addEventListener('click', (e) => {
        if (!e.target.classList.contains('profile-picture')) {
            const name = story.querySelector('.name').textContent;
            const isFollowing = story.classList.contains('following');
            
            if (isFollowing) {
                story.classList.remove('following');
                story.querySelector('.name').textContent = name.replace('✓ ', '');
            } else {
                story.classList.add('following');
                story.querySelector('.name').textContent = '✓ ' + name;
            }
        }
    });
});

// COMMENT FUNCTIONALITY
const commentButtons = document.querySelectorAll('.fa-comment');

commentButtons.forEach(button => {
    button.addEventListener('click', () => {
        const feed = button.closest('.feed');
        const commentsSection = feed.querySelector('.comments');
        
        // Toggle comment input field
        if (!feed.querySelector('.comment-input')) {
            const commentInput = document.createElement('div');
            commentInput.className = 'comment-input';
            commentInput.innerHTML = `
                <div class="profile-picture">
                    <img src="./smp1/pic1.jpg">
                </div>
                <input type="text" placeholder="Write a comment...">
                <button class="btn btn-primary post-comment">Post</button>
            `;
            
            feed.insertBefore(commentInput, commentsSection.nextSibling);
            
            // Add event listener to post button
            const postButton = commentInput.querySelector('.post-comment');
            postButton.addEventListener('click', () => {
                const input = commentInput.querySelector('input');
                if (input.value.trim()) {
                    // Update comment count
                    const commentCount = commentsSection.textContent.match(/\d+/);
                    const newCount = commentCount ? parseInt(commentCount[0]) + 1 : 1;
                    commentsSection.textContent = `View all ${newCount} comments`;
                    
                    // Clear input
                    input.value = '';
                }
            });
        } else {
            feed.removeChild(feed.querySelector('.comment-input'));
        }
    });
});

// HANDLE FRIEND REQUESTS
const friendRequestButtons = document.querySelectorAll('.friend-requests .btn');

friendRequestButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const request = button.closest('.request');
        
        if (button.classList.contains('btn-primary')) {
            // Accept friend request
            button.textContent = 'Friends';
            button.nextElementSibling.style.display = 'none';
            
            // Add to messages (simulated)
            setTimeout(() => {
                request.remove();
                const messagesContainer = document.querySelector('.messages');
                const newMessage = document.createElement('div');
                newMessage.className = 'message';
                newMessage.innerHTML = `
                    <div class="profile-picture">
                        <img src="${request.querySelector('img').src}">
                    </div>
                    <div class="message-body">
                        <h5>${request.querySelector('h5').textContent}</h5>
                        <p class="text-muted">You are now friends</p>
                    </div>
                `;
                messagesContainer.insertBefore(newMessage, messagesContainer.firstChild);
            }, 500);
        } else {
            // Decline friend request
            request.remove();
        }
    });
});

// SEND MESSAGE FUNCTIONALITY
const messageInputs = document.querySelectorAll('.messages input[type="text"]');

messageInputs.forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
            const messagesContainer = input.closest('.messages');
            const newMessage = document.createElement('div');
            newMessage.className = 'message';
            newMessage.innerHTML = `
                <div class="profile-picture">
                    <img src="./smp1/pic1.jpg">
                </div>
                <div class="message-body">
                    <h5>You</h5>
                    <p class="text-bold">${input.value}</p>
                </div>
            `;
            messagesContainer.insertBefore(newMessage, input.nextElementSibling);
            input.value = '';
        }
    });
});

// STORY VIEWER
const stories = document.querySelectorAll('.story');

stories.forEach(story => {
    story.addEventListener('click', () => {
        if (!story.classList.contains('viewed')) {
            story.classList.add('viewed');
            story.style.opacity = '0.7';
            
            // Simulate story viewing
            const storyViewer = document.createElement('div');
            storyViewer.className = 'story-viewer';
            storyViewer.style.backgroundImage = `url(${story.style.backgroundImage || 'none'})`;
            storyViewer.innerHTML = `
                <div class="story-header">
                    <div class="profile-picture">
                        <img src="${story.querySelector('.profile-picture img')?.src || ''}">
                    </div>
                    <div class="info">
                        <h4>${story.querySelector('.name').textContent.replace('✓ ', '')}</h4>
                        <small>Just now</small>
                    </div>
                    <i class="fa fa-times close-story"></i>
                </div>
                <div class="progress-bar">
                    <div class="progress"></div>
                </div>
            `;
            document.body.appendChild(storyViewer);
            
            // Animate progress bar
            const progressBar = storyViewer.querySelector('.progress');
            progressBar.style.width = '100%';
            progressBar.style.transition = 'width 5s linear';
            
            // Close story
            const closeBtn = storyViewer.querySelector('.close-story');
            closeBtn.addEventListener('click', () => {
                storyViewer.remove();
            });
            
            // Auto close after 5 seconds
            setTimeout(() => {
                if (storyViewer.parentNode) {
                    storyViewer.remove();
                }
            }, 5000);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize elements
    const bookmarkMenu = document.querySelector('.sidebar .fa-bookmark').closest('.menu-item');
    const bookmarksPopup = document.querySelector('.bookmarks-popup');
    const closeBtn = document.querySelector('.close-bookmarks');
    const overlay = document.querySelector('.overlay');
    const bookmarksList = document.querySelector('.bookmarks-list');
    
    // Sample bookmarks data (replace with your actual data handling)
    let bookmarks = [];

    // Show bookmarks popup
    bookmarkMenu.addEventListener('click', function(e) {
        if (!e.target.classList.contains('fa-bookmark')) {
            bookmarksPopup.style.display = 'block';
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
            renderBookmarks();
        }
    });

    // Close popup
    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);

    function closePopup() {
        bookmarksPopup.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Render bookmarks list
    function renderBookmarks() {
        if (bookmarks.length === 0) {
            bookmarksList.innerHTML = `
                <div class="empty-state">
                    <i class="far fa-bookmark"></i>
                    <p>No saved posts yet</p>
                </div>
            `;
            return;
        }

        bookmarksList.innerHTML = bookmarks.map(bookmark => `
            <div class="bookmark-item" data-post-id="${bookmark.id}">
                <div class="bookmark-image">
                    <img src="${bookmark.image}" alt="Bookmarked post">
                </div>
                <div class="bookmark-info">
                    <h4>${bookmark.username}</h4>
                    <div class="caption">${bookmark.caption}</div>
                    <small>${bookmark.time}</small>
                </div>
            </div>
        `).join('');

        // Add click handlers to bookmarks
        document.querySelectorAll('.bookmark-item').forEach(item => {
            item.addEventListener('click', function() {
                const postId = this.dataset.postId;
                const post = document.querySelector(`.feed[data-post-id="${postId}"]`);
                if (post) {
                    post.scrollIntoView({ behavior: 'smooth' });
                    post.style.boxShadow = '0 0 0 2px var(--color-primary)';
                    setTimeout(() => post.style.boxShadow = 'none', 2000);
                }
                closePopup();
            });
        });
    }

    // Toggle bookmark on post (add this to your existing post interaction code)
    document.querySelectorAll('.fa-bookmark').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('far');
            this.classList.toggle('fas');
            
            const post = this.closest('.feed');
            const postId = post.dataset.postId;
            
            if (this.classList.contains('fas')) {
                // Add to bookmarks
                if (!bookmarks.some(b => b.id === postId)) {
                    bookmarks.push({
                        id: postId,
                        username: post.querySelector('.user h3')?.textContent || 'Unknown',
                        caption: post.querySelector('.caption p')?.textContent || '',
                        image: post.querySelector('.picture img')?.src || '',
                        time: post.querySelector('.user small')?.textContent || 'Just now'
                    });
                }
            } else {
                // Remove from bookmarks
                bookmarks = bookmarks.filter(b => b.id !== postId);
            }
        });
    });

    // Assign IDs to posts if not already done
    document.querySelectorAll('.feed').forEach((post, index) => {
        if (!post.dataset.postId) {
            post.dataset.postId = `post-${index}`;
        }
    });
});

//END