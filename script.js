document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Navigation Switcher
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.view-section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            sections.forEach(s => s.classList.add('hidden'));

            item.classList.add('active');
            const targetId = item.getAttribute('data-target');
            document.getElementById(targetId).classList.remove('hidden');
        });
    });

    // Feed Toggle Switcher (Reels vs Posts)
    const btnReelsView = document.getElementById('btnReelsView');
    const btnPostsView = document.getElementById('btnPostsView');
    const reelsContainer = document.getElementById('reelsContainer');
    const postsContainer = document.getElementById('postsContainer');

    btnReelsView.addEventListener('click', () => {
        btnReelsView.classList.add('active');
        btnPostsView.classList.remove('active');
        reelsContainer.classList.remove('hidden');
        postsContainer.classList.add('hidden');
    });

    btnPostsView.addEventListener('click', () => {
        btnPostsView.classList.add('active');
        btnReelsView.classList.remove('active');
        postsContainer.classList.remove('hidden');
        reelsContainer.classList.add('hidden');
    });

    // Chat Switcher & Messaging
    const chatItems = document.querySelectorAll('.chat-item');
    const activeChatName = document.getElementById('activeChatName');
    const activeChatAvatar = document.getElementById('activeChatAvatar');

    const chatUsers = {
        alex: {
            name: 'Alex Smith',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
        },
        elena: {
            name: 'Elena Rostova',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
        }
    };

    chatItems.forEach(item => {
        item.addEventListener('click', () => {
            chatItems.forEach(c => c.classList.remove('active'));
            item.classList.add('active');

            const userKey = item.getAttribute('data-chat');
            const user = chatUsers[userKey];
            if (user) {
                activeChatName.textContent = user.name;
                activeChatAvatar.src = user.avatar;
            }
        });
    });

    // Real-time Chat Simulation
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const messagesContainer = document.getElementById('messagesContainer');

    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'message outgoing';
        userMsg.innerHTML = `<p>${text}</p><span class="msg-time">${time}</span>`;
        messagesContainer.appendChild(userMsg);

        chatInput.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Auto-reply simulation
        setTimeout(() => {
            const replyMsg = document.createElement('div');
            replyMsg.className = 'message incoming';
            replyMsg.innerHTML = `<p>Awesome! Welcome to Civic ✨</p><span class="msg-time">${time}</span>`;
            messagesContainer.appendChild(replyMsg);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1200);
    }

    sendMessageBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Like buttons toggle action
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('liked');
            const icon = this.querySelector('svg');
            if (icon) {
                icon.style.fill = this.classList.contains('liked') ? '#FF0844' : 'none';
                icon.style.color = this.classList.contains('liked') ? '#FF0844' : 'currentColor';
            }
        });
    });
});
