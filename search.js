// Search data structure
const searchData = {
    projects: [
        {
            title: 'WEBTALK',
            description: 'A Python-based web application for secure communication and networking.',
            tags: ['python', 'web security', 'communication', 'networking'],
            url: 'https://github.com/drackyjr/WEBTALK'
        },
        {
            title: 'Dragon-Key',
            description: 'A lightweight, real-time keylogger for security auditing and penetration testing.',
            tags: ['security', 'pentesting', 'ethical hacking', 'python'],
            url: 'https://github.com/drackyjr/dragon-key'
        },
        {
            title: 'Email Spam Filter',
            description: 'Machine learning-based email spam filtering system.',
            tags: ['machine learning', 'email security', 'python', 'jupyter'],
            url: 'https://github.com/drackyjr/EMAIL-SPAM-FILTER'
        },
        {
            title: 'TCPCHAT',
            description: 'A Python-based client-server communication system.',
            tags: ['python', 'networking', 'tcp', 'socket programming'],
            url: 'https://github.com/drackyjr/TCPCHAT'
        },
         {
            title: 'WebCapture',
            description: 'An OSINT reconnaissance tool that extracts critical intelligence from websites—uncovering domains, subdomains, emails, technologies, and more from a single URL input.',
            tags: ['python', 'osint', 'imformation gathering', 'domain'],
            url: 'https://github.com/drackyjr/WEBCAPTURE'
        }
    ],
    skills: [
        'Cybersecurity',
        'Penetration Testing',
        'Python Development',
        'Network Security',
        'Web Security',
        'OWASP Top 10',
        'CTF',
        'System Exploitation',
        'Metasploit',
        'Burp Suite',
        'Nmap',
        'SQLmap',
        'Blockchain Security',
        'SIEM Operation & Log Analysis',
        'Web Application Pentesting',
        'Scripting for Exploits (Python & Bash)',
        'Firewall, IDS/IPS Management',
        'CTF & Realistic Lab Experience',
        'Networking & Linux Structure',
        'Security Concepts: CIA Triad',
        'Report Writing & Documentation',
        'Git & Version Control',
        'Knowledge of ExploitDB usage',
        'Virtualization & Labs (VMWare, Docker)',
        'Teamwork & leadership in Events & Projects',
        'Problem Solving & Analytical Skills',
       
    
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const searchToggle = document.querySelector('.search-toggle');
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');

    // Toggle search container with accessibility improvements
    searchToggle.addEventListener('click', () => {
        const isActive = searchContainer.classList.contains('active');
        
        searchContainer.classList.toggle('active');
        searchToggle.setAttribute('aria-expanded', !isActive);
        
        if (!isActive) {
            searchInput.focus();
        }
    });

    // Close search when clicking outside or pressing Escape
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-search')) {
            closeSearch();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchContainer.classList.contains('active')) {
            closeSearch();
        }
    });
    
    function closeSearch() {
        searchContainer.classList.remove('active');
        searchToggle.setAttribute('aria-expanded', 'false');
        searchInput.value = '';
        searchResults.innerHTML = '';
    }

    // Handle search input
    searchInput.addEventListener('input', debounce((e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }

        const results = searchData.projects
            .filter(project => 
                project.title.toLowerCase().includes(query) ||
                project.description.toLowerCase().includes(query) ||
                project.tags.some(tag => tag.toLowerCase().includes(query))
            )
            .concat(
                searchData.skills
                    .filter(skill => skill.toLowerCase().includes(query))
                    .map(skill => ({ title: skill, type: 'skill' }))
            );

        displayResults(results);
    }, 300));

    function displayResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item"><p>No results found</p></div>';
            return;
        }

        searchResults.innerHTML = results
            .map(result => {
                if (result.type === 'skill') {
                    return `
                        <div class="search-result-item">
                            <h4>${result.title}</h4>
                            <p>Skill/Technology</p>
                        </div>
                    `;
                }
                return `
                    <div class="search-result-item" onclick="window.open('${result.url}', '_blank')">
                        <h4>${result.title}</h4>
                        <p>${result.description}</p>
                    </div>
                `;
            })
            .join('');
    }

    // Debounce function to limit API calls
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}); 
