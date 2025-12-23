
        // Mobile menu toggle
        const burger = document.querySelector('.burger');
        const navLinks = document.querySelector('.nav-links');

        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Fade-in animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            e.target.reset();
        });

        // Chatbot functionality
        const chatbotToggle = document.getElementById('chatbotToggle');
        const chatbotWindow = document.getElementById('chatbotWindow');
        const chatbotClose = document.getElementById('chatbotClose');
        const chatbotMessages = document.getElementById('chatbotMessages');
        const chatbotInput = document.getElementById('chatbotInput');
        const chatbotSend = document.getElementById('chatbotSend');

        // Toggle chatbot
        chatbotToggle.addEventListener('click', () => {
            chatbotWindow.classList.toggle('active');
            if (chatbotWindow.classList.contains('active')) {
                chatbotInput.focus();
            }
        });

        chatbotClose.addEventListener('click', () => {
            chatbotWindow.classList.remove('active');
        });

        // Bot responses
        const botResponses = {
            services: "We offer: CRM Solutions, Customer Service, Promotion, Marketing Campaigns, Social Media Management, and Digital Tracking & Reporting. Which service interests you?",
            crm: "Our CRM solutions help streamline customer relationships and enhance engagement. Would you like to schedule a consultation?",
            customer: "We provide exceptional customer service strategies that build trust and foster long-term relationships.",
            promotion: "Our creative promotional campaigns capture attention and convert prospects into loyal customers.",
            marketing: "We design strategic marketing initiatives to maximize ROI and achieve your business objectives.",
            social: "We offer comprehensive social media management including content creation, scheduling, and engagement strategies.",
            tracking: "Our digital tracking and reporting services provide advanced analytics to measure and optimize your performance.",
            pricing: "Our pricing varies based on your specific needs. Please contact us at +201099941724 or info@alshimimedia.com for a custom quote.",
            contact: "📞 Phone: +201099941724\n✉️ Email: info@alshimimedia.com\n📍 Location: monfia, elsadat , Egypt",
            hello: "Hello! How can I assist you today?",
            hi: "Hi there! What can I help you with?",
            help: "I can help you with:\n• Our services\n• Pricing information\n• Contact details\n• General inquiries\nWhat would you like to know?",
            default: "Thank you for your message! For detailed information, please contact us at info@alshimimedia.com or call +201099941724."
        };

        // Add message to chat
        function addMessage(text, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            contentDiv.textContent = text;
            
            messageDiv.appendChild(contentDiv);
            chatbotMessages.appendChild(messageDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }

        // Show typing indicator
        function showTyping() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot';
            typingDiv.id = 'typingIndicator';
            typingDiv.innerHTML = `
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            `;
            chatbotMessages.appendChild(typingDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }

        // Remove typing indicator
        function removeTyping() {
            const typing = document.getElementById('typingIndicator');
            if (typing) typing.remove();
        }

        // Get bot response
        function getBotResponse(userMessage) {
            const message = userMessage.toLowerCase().trim();
            
            if (message.includes('service')) return botResponses.services;
            if (message.includes('crm')) return botResponses.crm;
            if (message.includes('customer')) return botResponses.customer;
            if (message.includes('promotion') || message.includes('promote')) return botResponses.promotion;
            if (message.includes('marketing') || message.includes('campaign')) return botResponses.marketing;
            if (message.includes('social') || message.includes('media')) return botResponses.social;
            if (message.includes('track') || message.includes('report') || message.includes('analytics')) return botResponses.tracking;
            if (message.includes('price') || message.includes('cost') || message.includes('pricing')) return botResponses.pricing;
            if (message.includes('contact') || message.includes('phone') || message.includes('email')) return botResponses.contact;
            if (message.includes('hello') || message.includes('hi') || message.includes('hey')) return botResponses.hello;
            if (message.includes('help')) return botResponses.help;
            
            return botResponses.default;
        }

        // Send message
        function sendMessage() {
            const message = chatbotInput.value.trim();
            if (!message) return;

            // Add user message
            addMessage(message, true);
            chatbotInput.value = '';

            // Show typing
            showTyping();

            // Simulate delay and show bot response
            setTimeout(() => {
                removeTyping();
                const response = getBotResponse(message);
                addMessage(response);
            }, 1000);
        }

        // Send button click
        chatbotSend.addEventListener('click', sendMessage);

        // Enter key to send
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Quick reply buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-reply-btn')) {
                const reply = e.target.getAttribute('data-reply');
                chatbotInput.value = reply;
                sendMessage();
            }
        });
    