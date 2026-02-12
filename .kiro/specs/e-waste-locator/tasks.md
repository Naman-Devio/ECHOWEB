# Implementation Plan

- [x] 1. Set up project structure and development environment






  - Initialize Next.js 14 project with TypeScript and App Router
  - Configure Tailwind CSS with custom eco-inspired theme (greens, blues, neutral tones)
  - Set up ESLint, Prettier, and Git hooks with Husky
  - Create folder structure: `/app`, `/components`, `/lib`, `/services`, `/types`, `/hooks`
  - Initialize Node.js backend with Express and TypeScript
  - Configure Prisma ORM with PostgreSQL connection
  - Set up environment variables for development and production
  - _Requirements: 15.1, 15.2, 15.3_





- [x] 2. Implement database schema and models




  - [ ] 2.1 Create Prisma schema for all data models
    - Define User model with authentication fields and user types
    - Define Recycler model with certification and location fields
    - Define PickupRequest model with tracking and status fields
    - Define Review model with rating and moderation fields
    - Define ImpactMetrics model with environmental data


    - Define AISession model for chat history
    - Set up relationships and indexes


    - _Requirements: 5.1, 3.1, 8.1, 4.1_
  
  - [ ] 2.2 Run database migrations and seed test data
    - Generate Prisma client
    - Run initial migration
    - Create seed script with sample recyclers and users
    - _Requirements: 5.1_
  
  - [-]* 2.3 Write property test for tracking ID uniqueness


    - **Property 8: Tracking ID uniqueness**
    - **Validates: Requirements 3.2**





  
  - [ ]* 2.4 Write property test for password hashing security
    - **Property 22: Password hashing security**
    - **Validates: Requirements 11.2**


- [ ] 3. Implement authentication system
  - [ ] 3.1 Create user registration endpoint with email verification
    - Implement POST /api/auth/register with Zod validation
    - Hash passwords using bcrypt with 12 salt rounds
    - Generate and send OTP via email
    - Store user with emailVerified=false

    - _Requirements: 11.1, 11.2_
  
  - [ ] 3.2 Create email verification and login endpoints
    - Implement POST /api/auth/verify-email with OTP validation
    - Implement POST /api/auth/login with JWT token generation
    - Set JWT expiration to 24 hours
    - Implement refresh token mechanism
    - _Requirements: 11.1, 11.3_
  
  - [ ] 3.3 Create authentication middleware and password reset
    - Implement JWT verification middleware
    - Implement POST /api/auth/forgot-password
    - Implement POST /api/auth/reset-password
    - Add rate limiting to prevent brute force
    - _Requirements: 11.3_
  
  - [ ]* 3.4 Write property test for JWT expiration correctness
    - **Property 23: JWT expiration correctness**
    - **Validates: Requirements 11.3**
  
  - [ ]* 3.5 Write integration tests for authentication flow
    - Test complete registration and verification flow
    - Test login with valid and invalid credentials
    - Test token refresh mechanism
    - Test password reset flow
    - _Requirements: 11.1, 11.3_

- [ ] 4. Implement recycler management backend
  - [ ] 4.1 Create recycler registration and verification endpoints
    - Implement POST /api/recyclers/register with business data collection
    - Implement CPCB verification service (mock for now, integrate later)
    - Implement PUT /api/admin/recyclers/:id/verify for admin approval
    - Store certification documents in S3
    - _Requirements: 5.1, 5.2, 5.3_
  
  - [ ] 4.2 Create recycler search and filtering endpoints
    - Implement GET /api/recyclers/search with geolocation parameters
    - Implement distance calculation using Haversine formula
    - Implement filtering by device type, bulk pickup, certification
    - Return results sorted by distance
    - _Requirements: 1.2, 1.5_
  
  - [ ] 4.3 Create recycler profile and update endpoints
    - Implement GET /api/recyclers/:id for detailed profile
    - Implement PUT /api/recyclers/:id for profile updates
    - Allow recyclers to update operating hours and services
    - _Requirements: 1.4, 5.5_
  
  - [ ]* 4.4 Write property test for recycler search radius constraint
    - **Property 1: Recycler search radius constraint**
    - **Validates: Requirements 1.2**
  
  - [ ]* 4.5 Write property test for filter application correctness
    - **Property 3: Filter application correctness**
    - **Validates: Requirements 1.5**
  
  - [ ]* 4.6 Write property test for registration data completeness
    - **Property 12: Registration data completeness**
    - **Validates: Requirements 5.1**

- [ ] 5. Implement AI services integration
  - [ ] 5.1 Set up OpenAI API client with error handling
    - Configure OpenAI SDK with API key
    - Implement circuit breaker pattern for API calls
    - Set up fallback to Gemini API if OpenAI fails
    - Add request/response logging
    - _Requirements: 15.4_
  
  - [ ] 5.2 Create image classification service
    - Implement POST /api/ai/classify-image endpoint
    - Upload image to S3 and get URL
    - Call OpenAI Vision API for device classification
    - Return device type with confidence score
    - Store classification result in AISession
    - _Requirements: 2.1_
  
  - [ ] 5.3 Create AI chat assistant service
    - Implement POST /api/ai/chat endpoint
    - Maintain conversation context in AISession
    - Provide recycling guidance based on device type
    - Include safety warnings for hazardous devices
    - Support multiple languages (English, Hindi)
    - _Requirements: 2.2, 2.4, 2.5_
  
  - [ ] 5.4 Create AI recommendation service
    - Implement POST /api/ai/recommend-recyclers endpoint
    - Filter recyclers by identified device type
    - Sort by distance and rating
    - Return top 5 recommendations
    - _Requirements: 2.3_
  
  - [ ]* 5.5 Write property test for AI recommendation device matching
    - **Property 4: AI recommendation device matching**
    - **Validates: Requirements 2.3**
  
  - [ ]* 5.6 Write property test for hazardous device safety warnings
    - **Property 6: Hazardous device safety warnings**
    - **Validates: Requirements 2.5**
  
  - [ ]* 5.7 Write property test for circuit breaker failure isolation
    - **Property 26: Circuit breaker failure isolation**
    - **Validates: Requirements 15.4**

- [ ] 6. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Implement pickup request management
  - [ ] 7.1 Create pickup request submission endpoint
    - Implement POST /api/pickups with request data collection
    - Generate unique tracking ID (format: EWL-YYYY-NNNNNN)
    - Calculate estimated impact metrics
    - Send confirmation email and SMS with tracking ID
    - _Requirements: 3.1, 3.2, 3.3_
  
  - [ ] 7.2 Implement pickup request routing and notification
    - Find recyclers within service area that accept device types
    - For bulk requests (>100kg), filter to bulk-capable recyclers only
    - Send notifications to matched recyclers via email
    - Create dashboard alerts for recyclers
    - _Requirements: 6.1, 12.3_
  
  - [ ] 7.3 Create pickup status management endpoints
    - Implement PUT /api/pickups/:trackingId/status for status updates
    - Implement recycler accept/reject actions
    - Implement request re-routing on rejection
    - Send notifications on status changes
    - _Requirements: 6.3, 6.5, 3.4_
  
  - [ ] 7.4 Create pickup completion endpoint
    - Implement POST /api/pickups/:trackingId/complete
    - Collect actual weight and completion confirmation
    - Calculate final impact metrics (CO₂, materials recovered)
    - Generate compliance certificate for bulk pickups
    - Update user and global impact metrics
    - Prompt user for review
    - _Requirements: 6.4, 3.5, 12.4, 8.1_
  
  - [ ]* 7.5 Write property test for pickup request data completeness
    - **Property 7: Pickup request data completeness**
    - **Validates: Requirements 3.1**
  
  - [ ]* 7.6 Write property test for pickup completion state consistency
    - **Property 9: Pickup completion state consistency**
    - **Validates: Requirements 3.5**
  
  - [ ]* 7.7 Write property test for bulk request routing threshold
    - **Property 24: Bulk request routing threshold**
    - **Validates: Requirements 12.3**
  
  - [ ]* 7.8 Write property test for request rejection re-routing
    - **Property 15: Request rejection re-routing**
    - **Validates: Requirements 6.5**

- [ ] 8. Implement impact tracking and analytics
  - [ ] 8.1 Create impact calculation utilities
    - Implement CO₂ savings calculation by device type and weight
    - Implement material recovery calculation (gold, silver, copper, etc.)
    - Create lookup tables for device-specific rates
    - _Requirements: 4.1_
  
  - [ ] 8.2 Create user impact dashboard endpoint
    - Implement GET /api/impact/user/:userId
    - Aggregate total e-waste diverted from completed pickups
    - Calculate cumulative CO₂ saved and materials recovered
    - Provide historical trends and disposal history
    - Compare with community averages
    - _Requirements: 4.2, 4.3, 4.5_
  
  - [ ] 8.3 Create global impact statistics endpoint
    - Implement GET /api/impact/global for landing page stats
    - Aggregate platform-wide metrics in real-time
    - Cache results in Redis with 5-minute TTL
    - Implement WebSocket for live updates (optional)
    - _Requirements: 13.1, 13.2, 13.3_
  
  - [ ]* 8.4 Write property test for CO₂ calculation positivity
    - **Property 10: CO₂ calculation positivity**
    - **Validates: Requirements 4.1**
  
  - [ ]* 8.5 Write property test for impact metric aggregation accuracy
    - **Property 11: Impact metric aggregation accuracy**
    - **Validates: Requirements 4.2**
  
  - [ ]* 8.6 Write property test for material counter increment consistency
    - **Property 25: Material counter increment consistency**
    - **Validates: Requirements 13.3**

- [ ] 9. Implement review and rating system
  - [ ] 9.1 Create review submission endpoint
    - Implement POST /api/recyclers/:id/reviews
    - Validate rating (1-5 stars) and optional comment
    - Check for inappropriate language and spam
    - Link review to completed pickup request
    - _Requirements: 8.1, 8.3_
  
  - [ ] 9.2 Create review display and rating calculation
    - Implement GET /api/recyclers/:id/reviews with sorting
    - Calculate and update recycler average rating
    - Display total review count on profile
    - Trigger low rating notifications (<3 stars)
    - _Requirements: 8.2, 8.4, 8.5_
  
  - [ ]* 9.3 Write property test for low rating notification trigger
    - **Property 17: Low rating notification trigger**
    - **Validates: Requirements 8.5**

- [ ] 10. Implement admin panel backend
  - [ ] 10.1 Create admin dashboard analytics endpoint
    - Implement GET /api/admin/analytics
    - Aggregate total users, active recyclers, pending verifications
    - Calculate platform-wide disposal trends
    - Provide regional distribution data
    - _Requirements: 7.1, 7.4_
  
  - [ ] 10.2 Create recycler verification workflow endpoints
    - Implement GET /api/admin/recyclers/pending
    - Implement PUT /api/admin/recyclers/:id/verify with document viewer
    - Implement PUT /api/admin/recyclers/:id/suspend
    - Send notifications on approval/rejection
    - _Requirements: 7.2, 7.5_
  
  - [ ] 10.3 Create compliance monitoring endpoint
    - Implement GET /api/admin/compliance


    - Flag recyclers with low ratings (<3 stars)
    - Flag recyclers with expired certifications
    - Provide suspension controls
    - _Requirements: 7.3_
  
  - [ ]* 10.4 Write property test for compliance flagging accuracy
    - **Property 16: Compliance flagging accuracy**
    - **Validates: Requirements 7.3**

- [ ] 11. Checkpoint - Ensure all backend tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 12. Implement frontend landing page


  - [x] 12.1 Create landing page layout and hero section

    - Build HeroSection component with mission statement
    - Add location-based CTA button "Find Recycling Center Near Me"
    - Implement responsive design for mobile and desktop
    - Add eco-inspired animations and visuals
    - _Requirements: 9.1_
  

  - [ ] 12.2 Create impact statistics counter component
    - Build ImpactStatsCounter with animated counters
    - Fetch global impact data from API
    - Display e-waste diverted, CO₂ saved, materials recovered
    - Implement counter animation on scroll into view
    - Add fallback for unavailable data with timestamp
    - _Requirements: 13.1, 13.2, 13.3, 13.5_

  
  - [ ] 12.3 Create search bar component with geolocation
    - Build SearchBar with autocomplete
    - Implement browser geolocation detection
    - Add manual location entry option
    - Handle geolocation errors gracefully
    - _Requirements: 1.1_

- [ ] 13. Implement recycler discovery interface
  - [ ] 13.1 Create interactive map component
    - Integrate Google Maps JavaScript API
    - Build RecyclerMap with custom markers for recyclers
    - Implement marker clustering for dense areas
    - Add info windows with recycler summary
    - Support pinch-to-zoom and drag gestures on mobile
    - _Requirements: 1.2, 9.4_
  
  - [ ] 13.2 Create recycler list and card components
    - Build RecyclerList with infinite scroll
    - Build RecyclerCard showing name, rating, distance, certifications
    - Display accepted device types and bulk pickup availability
    - Implement sort options (distance, rating)
    - _Requirements: 1.3_
  
  - [ ] 13.3 Create filter panel component
    - Build FilterPanel with device type, distance, bulk pickup filters
    - Implement certification type filter
    - Add "Apply Filters" and "Clear All" actions
    - Update URL query params for shareable links
    - _Requirements: 1.5_
  
  - [ ] 13.4 Create recycler detail modal
    - Build RecyclerDetailModal with full information
    - Display address, contact details, operating hours, services
    - Show image gallery and certification badges
    - Display reviews and ratings
    - Add "Schedule Pickup" CTA button
    - _Requirements: 1.4_
  
  - [ ]* 13.5 Write property test for recycler result completeness
    - **Property 2: Recycler result completeness**
    - **Validates: Requirements 1.3**
  
  - [ ]* 13.6 Write property test for geographic notification routing
    - **Property 14: Geographic notification routing**
    - **Validates: Requirements 6.1**

- [ ] 14. Implement AI assistant interface
  - [ ] 14.1 Create chat interface component
    - Build ChatInterface with message history
    - Implement typing indicators and message bubbles
    - Add image upload button for device classification
    - Support camera capture on mobile devices
    - Maintain conversation context across messages
    - _Requirements: 2.2, 9.5_
  
  - [ ] 14.2 Create image uploader and classification result
    - Build ImageUploader with drag-and-drop
    - Implement camera capture for mobile
    - Show image preview before upload
    - Build DeviceClassificationResult component
    - Display device type, confidence score, recycling guidance
    - Show recommended recyclers for identified device
    - _Requirements: 2.1, 2.3_
  
  - [ ] 14.3 Implement language selection and safety warnings
    - Add language selector (English, Hindi, regional languages)
    - Display safety warnings for hazardous devices
    - Highlight hazardous components (batteries, CRT screens)
    - Provide safe handling procedures
    - _Requirements: 2.4, 2.5_
  
  - [ ]* 14.4 Write property test for language response consistency
    - **Property 5: Language response consistency**
    - **Validates: Requirements 2.4**

- [ ] 15. Implement pickup scheduling interface
  - [ ] 15.1 Create pickup request form
    - Build PickupRequestForm with address, device details, quantity
    - Implement address autocomplete with Google Places API
    - Add device type selector with quantity inputs
    - Validate all required fields with Zod
    - _Requirements: 3.1_
  
  - [ ] 15.2 Create time slot picker component
    - Build TimeSlotPicker with calendar view
    - Fetch available time slots from recycler
    - Show availability indicators
    - Allow selection of preferred date and time range
    - _Requirements: 3.1_
  
  - [ ] 15.3 Create pickup tracker component
    - Build PickupTracker with status timeline
    - Display tracking ID prominently
    - Show current status and status history
    - Provide recycler contact information
    - Add real-time status updates
    - _Requirements: 3.2, 3.4_

- [ ] 16. Implement user impact dashboard
  - [ ] 16.1 Create impact dashboard layout
    - Build ImpactDashboard with metric cards
    - Display total e-waste diverted, CO₂ saved, materials recovered
    - Show disposal history with details
    - Implement responsive grid layout
    - _Requirements: 4.2, 4.3_
  
  - [ ] 16.2 Create impact visualization charts
    - Build ImpactChart with line/bar chart options
    - Show trends over time (weekly, monthly, yearly)
    - Compare user metrics with community averages
    - Add time range selector
    - Use Chart.js or Recharts library
    - _Requirements: 4.5_
  
  - [ ] 16.3 Create disposal history component
    - Build DisposalHistory with sortable table
    - Show tracking ID, date, devices, weight, status
    - Add filtering by date range and status
    - Provide export to PDF option
    - _Requirements: 4.3_

- [ ] 17. Implement admin panel interface
  - [ ] 17.1 Create admin dashboard with analytics
    - Build PlatformAnalytics component
    - Display user growth, disposal trends, regional distribution
    - Show top recyclers by volume and rating
    - Add date range selector for analytics
    - _Requirements: 7.1, 7.4_
  
  - [ ] 17.2 Create recycler verification queue
    - Build RecyclerVerificationQueue component
    - List pending applications with key details
    - Implement document viewer for certifications
    - Add approve/reject actions with reason input
    - Show CPCB verification status
    - _Requirements: 7.2_
  
  - [ ] 17.3 Create compliance monitoring interface
    - Build ComplianceMonitor component
    - Flag recyclers with low ratings or expired certifications
    - Provide suspension controls with confirmation
    - Show compliance history and notes
    - _Requirements: 7.3, 7.5_

- [ ] 18. Implement accessibility features
  - [ ] 18.1 Add semantic HTML and ARIA labels
    - Use semantic HTML5 elements throughout
    - Add ARIA labels to all interactive elements
    - Implement proper heading hierarchy
    - Add alt text to all informational images
    - _Requirements: 10.1, 10.4_
  
  - [ ] 18.2 Implement keyboard navigation
    - Ensure all features accessible via keyboard
    - Add visible focus indicators to all interactive elements
    - Implement focus trapping in modals
    - Add skip navigation links
    - _Requirements: 10.2_
  
  - [ ] 18.3 Ensure color contrast and form accessibility
    - Verify all text meets WCAG 4.5:1 contrast ratio
    - Verify large text meets WCAG 3:1 contrast ratio
    - Associate error messages with form fields using ARIA
    - Announce form errors to screen readers
    - _Requirements: 10.3, 10.5_
  
  - [ ]* 18.4 Write property test for ARIA label completeness
    - **Property 19: ARIA label completeness**
    - **Validates: Requirements 10.1**
  
  - [ ]* 18.5 Write property test for color contrast compliance
    - **Property 20: Color contrast compliance**
    - **Validates: Requirements 10.3**
  
  - [ ]* 18.6 Write property test for image alt text presence
    - **Property 21: Image alt text presence**
    - **Validates: Requirements 10.4**
  
  - [ ]* 18.7 Write property test for touch target size compliance
    - **Property 18: Touch target size compliance**
    - **Validates: Requirements 9.2**

- [ ] 19. Implement mobile responsiveness
  - [ ] 19.1 Optimize layouts for mobile screens
    - Ensure responsive design from 320px to 768px width
    - Use mobile-first CSS approach
    - Implement collapsible navigation menu
    - Optimize touch interactions with 44px minimum tap targets
    - _Requirements: 9.1, 9.2_
  
  - [ ] 19.2 Optimize performance for mobile networks
    - Implement lazy loading for images
    - Use Next.js Image component for optimization
    - Minimize bundle size with code splitting
    - Add loading skeletons for better perceived performance
    - _Requirements: 9.3_
  
  - [ ]* 19.3 Run Lighthouse performance tests
    - Test page load time on simulated 3G
    - Verify Time to Interactive < 5s
    - Ensure accessibility score > 90
    - Fix any critical issues
    - _Requirements: 9.3_

- [ ] 20. Implement educational content section
  - [ ] 20.1 Create education section layout
    - Build education page with article categories
    - Categorize by device type, disposal methods, regulations
    - Implement article search and filtering
    - Add breadcrumb navigation
    - _Requirements: 14.1, 14.2_
  
  - [ ] 20.2 Create device-specific guidance pages
    - Build templates for device-specific articles
    - Include hazardous component warnings
    - Provide safe handling procedures
    - Add state-specific compliance information
    - Link to relevant recyclers
    - _Requirements: 14.4, 14.5_
  
  - [ ] 20.3 Integrate educational content in AI responses
    - Include citations to authoritative sources in AI responses
    - Link to relevant educational articles
    - Provide regulatory compliance information
    - _Requirements: 14.3_

- [ ] 21. Implement bulk user features
  - [ ] 21.1 Create bulk user registration
    - Extend registration form for organizations
    - Collect organization name, GST number, contact person
    - Add organization verification workflow
    - _Requirements: 12.1_
  
  - [ ] 21.2 Create bulk pickup request form
    - Build inventory list input for multiple device types
    - Accept CSV upload for large inventories
    - Calculate total estimated weight
    - Route to bulk-capable recyclers only
    - _Requirements: 12.2, 12.3_
  
  - [ ] 21.3 Create ESG reporting for organizations
    - Generate compliance certificates on pickup completion
    - Build ESG impact report with carbon offset calculations
    - Provide downloadable PDF reports
    - Include detailed material recovery breakdown
    - _Requirements: 12.4, 12.5_
  
  - [ ]* 21.4 Write property test for verification badge consistency
    - **Property 13: Verification badge consistency**
    - **Validates: Requirements 5.4**

- [ ] 22. Checkpoint - Ensure all frontend tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 23. Implement notification system
  - [ ] 23.1 Set up email service integration
    - Configure SendGrid or AWS SES
    - Create email templates for all notification types
    - Implement email sending service with retry logic
    - _Requirements: 3.3, 6.1_
  
  - [ ] 23.2 Set up SMS service integration
    - Configure Twilio or MSG91
    - Create SMS templates for critical notifications
    - Implement SMS sending service with rate limiting
    - _Requirements: 3.3_
  
  - [ ] 23.3 Implement notification preferences
    - Allow users to configure email/SMS preferences
    - Respect user preferences in all notifications
    - Provide unsubscribe links in emails
    - _Requirements: 3.3, 3.4, 6.1_

- [ ] 24. Implement security measures
  - [ ] 24.1 Add input validation and sanitization
    - Validate all API inputs with Zod schemas
    - Sanitize user inputs to prevent XSS
    - Use parameterized queries to prevent SQL injection
    - Validate file uploads (type, size, content)
    - _Requirements: 11.5_
  
  - [ ] 24.2 Implement rate limiting and CSRF protection
    - Add rate limiting to authentication endpoints
    - Implement CSRF token validation
    - Add request throttling for expensive operations
    - _Requirements: 11.3_
  
  - [ ] 24.3 Add security headers and encryption
    - Configure CSP headers
    - Enable HTTPS enforcement
    - Implement PII encryption at rest using AES-256
    - Set secure cookie flags
    - _Requirements: 11.4, 11.5_

- [ ] 25. Set up monitoring and error tracking
  - [ ] 25.1 Integrate Sentry for error tracking
    - Configure Sentry for frontend and backend
    - Set up error boundaries in React
    - Add context to error reports (user ID, request ID)
    - Configure alert rules for critical errors
    - _Requirements: 7.5_
  
  - [ ] 25.2 Set up logging and health checks
    - Implement structured logging with Winston
    - Create health check endpoints
    - Set up CloudWatch for infrastructure monitoring
    - Configure uptime monitoring with Pingdom
    - _Requirements: 7.1_

- [ ] 26. Deployment and CI/CD setup
  - [ ] 26.1 Configure production environment
    - Set up Vercel project for frontend
    - Configure AWS ECS for backend deployment
    - Set up RDS PostgreSQL with Multi-AZ
    - Configure ElastiCache Redis
    - Set up S3 buckets with proper permissions
    - _Requirements: 15.5_
  
  - [ ] 26.2 Set up CI/CD pipeline
    - Create GitHub Actions workflow for linting and testing
    - Add Docker build and push steps
    - Configure auto-deploy to staging on merge to develop
    - Set up manual approval for production deployment
    - Implement database migration automation
    - _Requirements: 15.5_
  
  - [ ] 26.3 Configure CDN and security
    - Set up Cloudflare CDN
    - Configure WAF rules
    - Enable DDoS protection
    - Set up SSL certificates with auto-renewal
    - _Requirements: 11.4_

- [ ] 27. Final testing and optimization
  - [ ]* 27.1 Run end-to-end tests for critical user journeys
    - Test user registration and recycler discovery flow
    - Test pickup scheduling and completion flow
    - Test recycler registration and verification flow
    - Test admin approval workflow
    - Test bulk user disposal request flow
    - _Requirements: All_
  
  - [ ]* 27.2 Perform security audit
    - Run OWASP ZAP security scan
    - Check for dependency vulnerabilities with npm audit
    - Verify authentication and authorization
    - Test rate limiting effectiveness
    - _Requirements: 11.1, 11.2, 11.3, 11.5_
  
  - [ ]* 27.3 Conduct accessibility audit
    - Run axe-core automated tests
    - Perform manual screen reader testing
    - Verify keyboard navigation
    - Check color contrast with WAVE
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_
  
  - [ ]* 27.4 Run performance optimization
    - Analyze bundle size and optimize
    - Run Lighthouse audits on all pages
    - Optimize database queries with indexes
    - Configure caching strategies
    - _Requirements: 9.3_

- [ ] 28. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
