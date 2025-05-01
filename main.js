document.addEventListener("DOMContentLoaded", () => {
    // Set current year in footer
    document.getElementById("currentYear").textContent = new Date().getFullYear()
  
    // Mobile menu toggle
    const menuToggle = document.getElementById("menuToggle")
    const mobileMenu = document.getElementById("mobileMenu")
  
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("active")
        const bars = menuToggle.querySelectorAll(".bar")
  
        if (mobileMenu.classList.contains("active")) {
          bars[0].style.transform = "rotate(45deg) translate(5px, 6px)"
          bars[1].style.opacity = "0"
          bars[2].style.transform = "rotate(-45deg) translate(5px, -6px)"
        } else {
          bars[0].style.transform = "none"
          bars[1].style.opacity = "1"
          bars[2].style.transform = "none"
        }
      })
    }
  
    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll(".mobile-nav-list a")
    if (mobileLinks.length > 0 && mobileMenu) {
      mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.classList.remove("active")
          const bars = menuToggle.querySelectorAll(".bar")
          bars[0].style.transform = "none"
          bars[1].style.opacity = "1"
          bars[2].style.transform = "none"
        })
      })
    }
  
    // Tabs functionality
    const tabButtons = document.querySelectorAll(".tab-btn")
  
    if (tabButtons.length > 0) {
      tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
          // Find the parent tabs container
          const tabsContainer = button.closest(".tabs-container")
          const tabId = button.getAttribute("data-tab")
  
          // Remove active class from all buttons and content in this container
          tabsContainer.querySelectorAll(".tab-btn").forEach((btn) => {
            btn.classList.remove("active")
          })
          tabsContainer.querySelectorAll(".tab-content").forEach((content) => {
            content.classList.remove("active")
          })
  
          // Add active class to clicked button and corresponding content
          button.classList.add("active")
          tabsContainer.querySelector(`#${tabId}`).classList.add("active")
        })
      })
    }
  
    // Image carousel functionality - completely revised
    const carousel = document.getElementById("imageCarousel")
  
    if (carousel) {
      const slides = carousel.querySelectorAll(".carousel-item")
      const totalSlides = slides.length
      const indicatorsContainer = document.getElementById("carouselIndicators")
      const prevBtn = document.getElementById("prevBtn")
      const nextBtn = document.getElementById("nextBtn")
      let currentSlide = 0
      let isAnimating = false
  
      // Clear any existing indicators
      indicatorsContainer.innerHTML = ""
  
      // Create indicators
      for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement("div")
        indicator.classList.add("indicator")
        if (i === 0) indicator.classList.add("active")
        indicator.addEventListener("click", () => {
          if (!isAnimating && currentSlide !== i) {
            goToSlide(i)
          }
        })
        indicatorsContainer.appendChild(indicator)
      }
  
      // Set initial positions
      slides.forEach((slide, index) => {
        slide.style.left = `${index * 100}%`
      })
  
      // Function to go to a specific slide
      function goToSlide(slideIndex) {
        if (isAnimating) return
        isAnimating = true
  
        // Update indicators
        const indicators = indicatorsContainer.querySelectorAll(".indicator")
        indicators.forEach((indicator, index) => {
          if (index === slideIndex) {
            indicator.classList.add("active")
          } else {
            indicator.classList.remove("active")
          }
        })
  
        // Move slides
        slides.forEach((slide) => {
          slide.style.transform = `translateX(-${slideIndex * 100}%)`
        })
  
        currentSlide = slideIndex
  
        // Reset animation lock after transition completes
        setTimeout(() => {
          isAnimating = false
        }, 600)
      }
  
      // Previous button
      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          if (!isAnimating) {
            const prevSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1
            goToSlide(prevSlide)
          }
        })
      }
  
      // Next button
      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          if (!isAnimating) {
            const nextSlide = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1
            goToSlide(nextSlide)
          }
        })
      }
  
      // Auto-advance carousel
      let carouselInterval = setInterval(() => {
        if (!isAnimating) {
          const nextSlide = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1
          goToSlide(nextSlide)
        }
      }, 5000)
  
      // Pause auto-advance on hover
      carousel.addEventListener("mouseenter", () => {
        clearInterval(carouselInterval)
      })
  
      carousel.addEventListener("mouseleave", () => {
        carouselInterval = setInterval(() => {
          if (!isAnimating) {
            const nextSlide = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1
            goToSlide(nextSlide)
          }
        }, 5000)
      })
    }
  
    // Active navigation based on scroll position
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll(".nav-list a")
  
    function highlightNavOnScroll() {
      const scrollY = window.pageYOffset
  
      sections.forEach((section) => {
        const sectionHeight = section.offsetHeight
        const sectionTop = section.offsetTop - 100
        const sectionId = section.getAttribute("id")
  
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach((link) => {
            link.classList.remove("active")
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("active")
            }
          })
        }
      })
    }
  
    window.addEventListener("scroll", highlightNavOnScroll)
  })
  