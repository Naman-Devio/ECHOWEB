# E-Waste Locator - Design Document

## Overview

The E-Waste Locator is a full-stack web application that leverages Generative AI to connect waste generators with certified e-waste recycling centers across India. The platform addresses the critical problem of 95% of e-waste flowing into the toxic informal sector by providing intelligent discovery, verification, and tracking capabilities.

### Key Design Principles

1. **AI-First Approach**: Generative AI powers waste classification, natural language guidance, and smart recommendations
2. **Trust & Verification**: Government certification validation ensures only authorized recyclers are listed
3. **Mobile-First Design**: Responsive interface optimized for mobile devices where most users will access the platform
4. **Accessibility**: WCAG 2.1 AA compliance ensures inclusivity for all users
5. **Scalability**: Microservices-ready architecture supports growth from local to national scale
6. **Environmental Impact**: Real-time tracking and visualization of environmental benefits

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Web App    │  │  Mobile Web  │  │ Admin Panel  │      │
│  │  (Next.js)   │  │  (Responsive)│  │   (React)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS/REST API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway Layer                       │
│                    (Express.js / Nginx)                      │
│              Authentication, Rate Limiting, CORS             │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│   User       │   │  Recycler    │   │   AI         │
│   Service    │   │  Service     │   │   Service    │
│              │   │              │   │              │
└──────────────┘   └──────────────┘   └──────────────┘
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│  Pickup      │   │  Impact      │   │  Maps        │
│  Service     │   │  Service     │   │  Service     │
│              │   │              │   │              │
└──────────────┘   └──────────────┘   └──────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│  PostgreSQL  │   │   Redis      │   │   S3         │
│  (Primary)   │   │   (Cache)    │   │  (Storage)   │
└──────────────┘   └──────────────┘   └──────────────┘
                            │
                            ▼
                   ┌──────────────┐
                   │  External    │
                   │  Services    │
                   │              │
                   │ • OpenAI API │
                   │ • Google Maps│
                   │ • SMS Gateway│
                   │ • Email SMTP │
                   └──────────────┘
```

### Technology Stack

**Frontend:**
- Framework: Next.js 14 (React 18) with App Router
- Styling: Tailwind CSS with custom eco-inspired theme
- State Management: React Context + Zustand for complex state
- Maps: Google Maps JavaScript API / Leaflet with OpenStreetMap
- Forms: React Hook Form with Zod validation
- HTTP Client: Axios with interceptors
- Image Upload: React Dropzone
- Accessibility: Radix UI primitives

**Backend:**
- Runtime: Node.js 20 LTS
- Framework: Express.js 4.x
- Language: TypeScript 5.x
- Authentication: JWT with refresh tokens
- Validation: Zod schemas
- ORM: Prisma
- API Documentation: OpenAPI 3.0 / Swagger

**Database:**
- Primary: PostgreSQL 15 (relational data, ACID compliance)
- Cache: Redis 7 (session storage, rate limiting)
- Search: PostgreSQL Full-Text Search with GIN indexes

**AI & ML:**
- Generative AI: OpenAI GPT-4 API (primary) with Gemini fallback
- Image Classification: OpenAI Vision API
- Vector Storage: PostgreSQL with pgvector extension (future: semantic search)

**Infrastructure:**
- Hosting: Vercel (frontend) + AWS EC2/ECS (backend)
- CDN: Cloudflare
- Storage: AWS S3 for images and documents
- Monitoring: Sentry (errors) + Vercel Analytics
- CI/CD: GitHub Actions

**External Services:**
- Maps: Google Maps Platform (Geocoding, Places, Maps JavaScript API)
- SMS: Twilio / MSG91
- Email: SendGrid / AWS SES
- Payment (future): Razorpay

## Components and Interfaces

### Frontend Components

#### 1. Landing Page Components

**HeroSection**
- Purpose: First impression with mission statement and CTA
- Props: `impactStats: ImpactStats`
- Features: Animated statistics counter, location-based CTA

**ImpactStatsCounter**
- Purpose: Real-time display of environmental impact
- Props: `eWasteDiverted: number, co2Saved: number, materialsRecovered: MaterialBreakdown`
- Updates: WebSocket connection for live updates

**SearchBar**
- Purpose: Quick access to recycler search
- Props: `onSearch: (query: string) => void, placeholder: string`
- Features: Autocomplete, geolocation button

#### 2. Recycler Discovery Components

**RecyclerMap**
- Purpose: Interactive map showing certified recyclers
- Props: `recyclers: Recycler[], userLocation: Coordinates, onRecyclerSelect: (id: string) => void`
- Features: Clustering, custom markers, info windows

**RecyclerList**
- Purpose: List view of recyclers with filtering
- Props: `recyclers: Recycler[], filters: FilterOptions, onFilterChange: (filters: FilterOptions) => void`
- Features: Infinite scroll, sort options

**RecyclerCard**
- Purpose: Summary view of recycler information
- Props: `recycler: Recycler, distance: number, onSelect: () => void`
- Displays: Name, rating, distance, certifications, accepted devices

**RecyclerDetailModal**
- Purpose: Detailed recycler information
- Props: `recycler: Recycler, onClose: () => void, onSchedulePickup: () => void`
- Features: Image gallery, reviews, operating hours, contact info

**FilterPanel**
- Purpose: Advanced filtering options
- Props: `filters: FilterOptions, onApply: (filters: FilterOptions) => void`
- Filters: Device type, distance, bulk pickup, certification type

#### 3. AI Assistant Components

**ChatInterface**
- Purpose: Conversational AI for waste guidance
- Props: `sessionId: string, onDeviceIdentified: (device: DeviceType) => void`
- Features: Message history, typing indicators, image upload

**ImageUploader**
- Purpose: Upload device images for AI classification
- Props: `onUpload: (file: File) => void, onClassified: (result: ClassificationResult) => void`
- Features: Drag-and-drop, camera capture, preview

**DeviceClassificationResult**
- Purpose: Display AI classification results
- Props: `device: DeviceType, confidence: number, recyclingGuidance: string`
- Features: Confidence score, recommended recyclers, safety warnings

#### 4. Pickup Scheduling Components

**PickupRequestForm**
- Purpose: Schedule e-waste pickup
- Props: `recycler: Recycler, onSubmit: (request: PickupRequest) => void`
- Fields: Address, device details, quantity, time slot, contact

**TimeSlotPicker**
- Purpose: Select available pickup time
- Props: `availableSlots: TimeSlot[], onSelect: (slot: TimeSlot) => void`
- Features: Calendar view, availability indicators

**PickupTracker**
- Purpose: Track pickup status
- Props: `trackingId: string`
- Features: Status timeline, real-time updates, recycler contact

#### 5. Impact Dashboard Components

**ImpactDashboard**
- Purpose: User's environmental contribution
- Props: `userId: string`
- Displays: Total waste diverted, CO₂ saved, materials recovered, disposal history

**ImpactChart**
- Purpose: Visual representation of impact over time
- Props: `data: ImpactData[], chartType: 'line' | 'bar'`
- Features: Time range selector, comparison with averages

**DisposalHistory**
- Purpose: List of past disposals
- Props: `disposals: Disposal[], onViewDetails: (id: string) => void`
- Features: Sorting, filtering, export to PDF

#### 6. Admin Panel Components

**RecyclerVerificationQueue**
- Purpose: Review pending recycler applications
- Props: `applications: RecyclerApplication[], onApprove: (id: string) => void, onReject: (id: string, reason: string) => void`
- Features: Document viewer, CPCB verification check

**PlatformAnalytics**
- Purpose: System-wide metrics and insights
- Props: `dateRange: DateRange`
- Displays: User growth, disposal trends, regional distribution, top recyclers

**ComplianceMonitor**
- Purpose: Track recycler compliance and quality
- Props: `recyclers: Recycler[]`
- Features: Low rating alerts, expired certification warnings, suspension controls

### Backend API Endpoints

#### Authentication & User Management

```typescript
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/verify-email
POST   /api/auth/refresh-token
POST   /api/auth/forgot-password
POST   /api/auth/reset-password

GET    /api/users/profile
PUT    /api/users/profile
GET    /api/users/impact
GET    /api/users/disposals
```

#### Recycler Management

```typescript
GET    /api/recyclers
GET    /api/recyclers/:id
POST   /api/recyclers/register
PUT    /api/recyclers/:id
GET    /api/recyclers/search?lat=&lng=&radius=&deviceType=
GET    /api/recyclers/:id/reviews
POST   /api/recyclers/:id/reviews
GET    /api/recyclers/:id/availability
```

#### Pickup Management

```typescript
POST   /api/pickups
GET    /api/pickups/:trackingId
PUT    /api/pickups/:trackingId/status
GET    /api/pickups/user/:userId
GET    /api/pickups/recycler/:recyclerId
POST   /api/pickups/:trackingId/complete
```

#### AI Services

```typescript
POST   /api/ai/classify-image
POST   /api/ai/chat
POST   /api/ai/recommend-recyclers
GET    /api/ai/chat/:sessionId/history
```

#### Impact & Analytics

```typescript
GET    /api/impact/global
GET    /api/impact/user/:userId
GET    /api/analytics/platform
GET    /api/analytics/regional
```

#### Admin

```typescript
GET    /api/admin/recyclers/pending
PUT    /api/admin/recyclers/:id/verify
PUT    /api/admin/recyclers/:id/suspend
GET    /api/admin/users
GET    /api/admin/reports/export
```

## Data Models

### User

```typescript
interface User {
  id: string;                    // UUID
  email: string;                 // Unique, validated
  passwordHash: string;          // bcrypt hashed
  name: string;
  phone: string;
  userType: 'individual' | 'business' | 'institution';
  
  // Business/Institution specific
  organizationName?: string;
  gstNumber?: string;
  
  // Preferences
  language: 'en' | 'hi' | 'ta' | 'te' | 'bn';
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  
  // Metadata
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date;
}
```

### Recycler

```typescript
interface Recycler {
  id: string;                    // UUID
  businessName: string;
  
  // Certification
  cpcbAuthNumber: string;        // Central Pollution Control Board
  certificationExpiry: Date;
  certificationDocuments: string[]; // S3 URLs
  verificationStatus: 'pending' | 'verified' | 'rejected' | 'suspended';
  verifiedAt?: Date;
  verifiedBy?: string;           // Admin user ID
  
  // Contact
  email: string;
  phone: string;
  website?: string;
  
  // Location
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  
  // Services
  acceptedDeviceTypes: DeviceType[];
  bulkPickupAvailable: boolean;
  bulkMinimumKg: number;
  serviceRadius: number;         // in kilometers
  operatingHours: {
    [key: string]: {             // day of week
      open: string;              // HH:mm
      close: string;
    };
  };
  
  // Ratings
  averageRating: number;
  totalReviews: number;
  
  // Capacity
  monthlyCapacityKg: number;
  currentMonthProcessedKg: number;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}
```

### PickupRequest

```typescript
interface PickupRequest {
  id: string;                    // UUID
  trackingId: string;            // User-friendly ID (e.g., EWL-2024-001234)
  
  // Parties
  userId: string;
  recyclerId: string;
  
  // Waste Details
  devices: {
    deviceType: DeviceType;
    quantity: number;
    estimatedWeightKg?: number;
    description?: string;
  }[];
  
  // Pickup Details
  pickupAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    landmark?: string;
  };
  contactPerson: {
    name: string;
    phone: string;
  };
  preferredTimeSlot: {
    date: Date;
    startTime: string;
    endTime: string;
  };
  
  // Status
  status: 'pending' | 'accepted' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  statusHistory: {
    status: string;
    timestamp: Date;
    note?: string;
  }[];
  
  // Completion
  actualWeightKg?: number;
  completedAt?: Date;
  complianceCertificateUrl?: string;
  
  // Impact
  impactMetrics?: {
    co2SavedKg: number;
    materialsRecovered: MaterialBreakdown;
  };
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}
```

### DeviceType

```typescript
enum DeviceType {
  MOBILE_PHONE = 'mobile_phone',
  LAPTOP = 'laptop',
  DESKTOP = 'desktop',
  TABLET = 'tablet',
  MONITOR = 'monitor',
  PRINTER = 'printer',
  KEYBOARD_MOUSE = 'keyboard_mouse',
  TV = 'tv',
  REFRIGERATOR = 'refrigerator',
  WASHING_MACHINE = 'washing_machine',
  AC = 'ac',
  BATTERY = 'battery',
  CHARGER = 'charger',
  CABLE = 'cable',
  SPEAKER = 'speaker',
  CAMERA = 'camera',
  OTHER = 'other'
}
```

### Review

```typescript
interface Review {
  id: string;
  recyclerId: string;
  userId: string;
  pickupRequestId: string;
  
  rating: number;                // 1-5
  comment?: string;
  
  // Moderation
  flagged: boolean;
  flagReason?: string;
  
  createdAt: Date;
  updatedAt: Date;
}
```

### ImpactMetrics

```typescript
interface ImpactMetrics {
  id: string;
  userId?: string;               // null for global metrics
  
  // Aggregated Data
  totalEWasteKg: number;
  totalCO2SavedKg: number;
  materialsRecovered: MaterialBreakdown;
  
  // Time-based
  periodStart: Date;
  periodEnd: Date;
  
  createdAt: Date;
  updatedAt: Date;
}

interface MaterialBreakdown {
  goldGrams: number;
  silverGrams: number;
  copperKg: number;
  aluminumKg: number;
  plasticKg: number;
  glassKg: number;
  otherKg: number;
}
```

### AISession

```typescript
interface AISession {
  id: string;
  userId?: string;               // null for anonymous
  
  messages: {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    imageUrl?: string;
  }[];
  
  // Classification Results
  identifiedDevices: {
    deviceType: DeviceType;
    confidence: number;
    imageUrl: string;
    timestamp: Date;
  }[];
  
  // Metadata
  language: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}
```

### Database Schema Relationships

```
User (1) ──────< (N) PickupRequest
User (1) ──────< (N) Review
User (1) ──────< (N) ImpactMetrics
User (1) ──────< (N) AISession

Recycler (1) ──< (N) PickupRequest
Recycler (1) ──< (N) Review

PickupRequest (1) ── (1) Review
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Recycler search radius constraint

*For any* location and radius parameters, all returned recyclers should be within the specified distance from the search location.

**Validates: Requirements 1.2**

### Property 2: Recycler result completeness

*For any* recycler in search results, the rendered output should contain recycler name, distance, certification status, accepted device types, and user ratings.

**Validates: Requirements 1.3**

### Property 3: Filter application correctness

*For any* set of recyclers and filter criteria (device type, bulk pickup, certification, distance), all filtered results should match all applied filter conditions.

**Validates: Requirements 1.5**

### Property 4: AI recommendation device matching

*For any* identified device type, all recommended recyclers should have that device type in their acceptedDeviceTypes list.

**Validates: Requirements 2.3**

### Property 5: Language response consistency

*For any* AI query in a supported language, the response language should match the query language as detected by language identification.

**Validates: Requirements 2.4**

### Property 6: Hazardous device safety warnings

*For any* device classified as hazardous (batteries, CRT screens, refrigerators with CFCs), the AI guidance should include safety-related keywords such as "hazard", "caution", "safety", or "danger".

**Validates: Requirements 2.5**

### Property 7: Pickup request data completeness

*For any* created pickup request, the stored record should contain all required fields: address, device details, quantity, and preferred time slot.

**Validates: Requirements 3.1**

### Property 8: Tracking ID uniqueness

*For any* set of pickup requests in the system, all tracking IDs should be unique with no duplicates.

**Validates: Requirements 3.2**

### Property 9: Pickup completion state consistency

*For any* pickup marked as completed, the status field should be 'completed' and impact metrics should be calculated and non-null.

**Validates: Requirements 3.5**

### Property 10: CO₂ calculation positivity

*For any* device type and positive weight value, the calculated CO₂ emissions prevented should be a positive number.

**Validates: Requirements 4.1**

### Property 11: Impact metric aggregation accuracy

*For any* user, the total e-waste diverted should equal the sum of actualWeightKg from all their completed pickup requests.

**Validates: Requirements 4.2**

### Property 12: Registration data completeness

*For any* recycler registration submission, the stored record should contain business name, CPCB authorization number, address, contact details, and accepted device types.

**Validates: Requirements 5.1**

### Property 13: Verification badge consistency

*For any* recycler with verificationStatus of 'verified', their profile rendering should include a certification badge indicator.

**Validates: Requirements 5.4**

### Property 14: Geographic notification routing

*For any* pickup request, all notified recyclers should have a service radius that includes the pickup location.

**Validates: Requirements 6.1**

### Property 15: Request rejection re-routing

*For any* rejected pickup request, the system should identify and notify at least one alternative recycler within the service area, or mark the request as unserviceable.

**Validates: Requirements 6.5**

### Property 16: Compliance flagging accuracy

*For any* recycler with average rating below 3.0 or certification expiry date in the past, the compliance monitoring system should flag the recycler.

**Validates: Requirements 7.3**

### Property 17: Low rating notification trigger

*For any* review submission that results in a recycler's average rating falling below 3 stars, notifications should be sent to both the recycler and administrator.

**Validates: Requirements 8.5**

### Property 18: Touch target size compliance

*For all* interactive elements in the mobile interface, the tap target size should be at least 44px in both width and height.

**Validates: Requirements 9.2**

### Property 19: ARIA label completeness

*For all* interactive elements (buttons, links, form inputs), appropriate ARIA labels or aria-label attributes should be present.

**Validates: Requirements 10.1**

### Property 20: Color contrast compliance

*For all* text elements, the color contrast ratio between text and background should be at least 4.5:1 for normal text or 3:1 for large text (18pt+).

**Validates: Requirements 10.3**

### Property 21: Image alt text presence

*For all* images that convey information (not decorative), the alt attribute should be non-empty and contain descriptive text.

**Validates: Requirements 10.4**

### Property 22: Password hashing security

*For any* stored user password, the passwordHash field should be a bcrypt hash with at least 12 salt rounds (verifiable by bcrypt hash format).

**Validates: Requirements 11.2**

### Property 23: JWT expiration correctness

*For any* successful login, the issued JWT token should have an expiration time of 24 hours from issuance.

**Validates: Requirements 11.3**

### Property 24: Bulk request routing threshold

*For any* pickup request with total estimated weight exceeding 100kg, only recyclers with bulkPickupAvailable set to true should be notified.

**Validates: Requirements 12.3**

### Property 25: Material counter increment consistency

*For any* completed disposal, the global material counters (gold, silver, copper, plastics) should increase by the calculated recovery amounts for that disposal.

**Validates: Requirements 13.3**

### Property 26: Circuit breaker failure isolation

*For any* external service failure, after the circuit breaker threshold is reached, subsequent calls should fail fast without attempting the external call.

**Validates: Requirements 15.4**

## Error Handling

### Frontend Error Handling

**Network Errors**
- Implement retry logic with exponential backoff for failed API calls
- Display user-friendly error messages for network timeouts
- Provide offline mode indicators when connectivity is lost
- Cache critical data in localStorage for offline access

**Validation Errors**
- Display inline validation errors on form fields
- Prevent form submission until all validation passes
- Provide clear, actionable error messages
- Highlight invalid fields with visual indicators

**AI Service Errors**
- Fallback to alternative AI provider if primary fails
- Display "AI temporarily unavailable" message with manual search option
- Log AI errors for monitoring and improvement
- Provide manual device type selection as fallback

**Map Service Errors**
- Fallback to static map or list view if map fails to load
- Allow manual address entry if geolocation fails
- Display error message with alternative navigation options

### Backend Error Handling

**Database Errors**
- Implement connection pooling with automatic reconnection
- Use transactions for multi-step operations
- Log database errors with context for debugging
- Return 500 status with generic message (hide internal details)

**External API Errors**
- Implement circuit breaker pattern for external services
- Set appropriate timeouts (5s for AI, 3s for maps, 10s for CPCB verification)
- Cache successful responses where appropriate
- Provide fallback responses or degraded functionality

**Authentication Errors**
- Return 401 for invalid/expired tokens
- Return 403 for insufficient permissions
- Implement rate limiting to prevent brute force attacks
- Log suspicious authentication patterns

**Validation Errors**
- Validate all inputs using Zod schemas
- Return 400 with detailed validation errors
- Sanitize inputs to prevent injection attacks
- Validate file uploads (type, size, content)

**Business Logic Errors**
- Return 409 for conflicts (e.g., duplicate tracking ID)
- Return 404 for not found resources
- Return 422 for unprocessable entities (e.g., invalid state transition)
- Provide clear error messages with resolution guidance

### Error Monitoring

- Use Sentry for error tracking and alerting
- Log errors with context (user ID, request ID, timestamp)
- Set up alerts for critical errors (database down, AI service unavailable)
- Monitor error rates and patterns for proactive fixes
- Implement health check endpoints for service monitoring

## Testing Strategy

### Unit Testing

**Framework**: Jest with React Testing Library (frontend), Jest (backend)

**Coverage Goals**: Minimum 80% code coverage for critical paths

**Focus Areas**:
- Component rendering and user interactions
- Form validation logic
- Data transformation functions
- API endpoint handlers
- Database repository methods
- Utility functions (distance calculation, CO₂ calculation, material recovery)

**Example Unit Tests**:
- Test that RecyclerCard renders all required information
- Test that distance calculation returns correct values for known coordinates
- Test that password hashing uses bcrypt with correct salt rounds
- Test that tracking ID generation produces expected format
- Test that filter logic correctly applies multiple criteria
- Test that impact metric calculations use correct formulas

### Property-Based Testing

**Framework**: fast-check (JavaScript/TypeScript property-based testing library)

**Configuration**: Minimum 100 iterations per property test

**Tagging Convention**: Each property-based test must include a comment with format:
```typescript
// Feature: e-waste-locator, Property X: [property description]
```

**Property Test Implementation**:
- Each correctness property from the design document must be implemented as a property-based test
- Tests should generate random valid inputs within the domain
- Tests should verify the property holds for all generated inputs
- Failed tests should provide clear counterexamples

**Example Property Tests**:

```typescript
// Feature: e-waste-locator, Property 1: Recycler search radius constraint
test('all returned recyclers are within specified radius', () => {
  fc.assert(
    fc.property(
      fc.record({
        lat: fc.double({ min: -90, max: 90 }),
        lng: fc.double({ min: -180, max: 180 }),
        radius: fc.integer({ min: 1, max: 100 })
      }),
      fc.array(generateRecycler()),
      (searchLocation, recyclers) => {
        const results = filterByRadius(recyclers, searchLocation, searchLocation.radius);
        return results.every(r => 
          calculateDistance(searchLocation, r.address.coordinates) <= searchLocation.radius
        );
      }
    ),
    { numRuns: 100 }
  );
});

// Feature: e-waste-locator, Property 8: Tracking ID uniqueness
test('all tracking IDs are unique', () => {
  fc.assert(
    fc.property(
      fc.array(generatePickupRequest(), { minLength: 2, maxLength: 100 }),
      (requests) => {
        const trackingIds = requests.map(r => r.trackingId);
        const uniqueIds = new Set(trackingIds);
        return trackingIds.length === uniqueIds.size;
      }
    ),
    { numRuns: 100 }
  );
});

// Feature: e-waste-locator, Property 11: Impact metric aggregation accuracy
test('total e-waste equals sum of completed pickups', () => {
  fc.assert(
    fc.property(
      fc.array(generateCompletedPickup()),
      (pickups) => {
        const userId = 'test-user';
        const total = calculateTotalEWaste(userId, pickups);
        const expected = pickups
          .filter(p => p.userId === userId)
          .reduce((sum, p) => sum + p.actualWeightKg, 0);
        return Math.abs(total - expected) < 0.01; // floating point tolerance
      }
    ),
    { numRuns: 100 }
  );
});
```

**Generator Functions**:
- Create smart generators that produce valid domain objects
- Constrain generators to realistic value ranges
- Include edge cases in generator distributions (empty arrays, boundary values)
- Reuse generators across multiple property tests

### Integration Testing

**Framework**: Supertest (API testing), Playwright (E2E testing)

**Focus Areas**:
- API endpoint integration with database
- Authentication flow (register, verify, login, refresh)
- Pickup request workflow (create, accept, complete)
- AI service integration with fallback
- Map service integration
- Email/SMS notification delivery

**Example Integration Tests**:
- Test complete user registration and verification flow
- Test recycler search with real database queries
- Test pickup request creation and notification delivery
- Test AI image classification with mock AI service
- Test admin approval workflow for recycler verification

### End-to-End Testing

**Framework**: Playwright

**Critical User Journeys**:
1. New user finds recycler and schedules pickup
2. Recycler registers and gets verified
3. Recycler accepts and completes pickup
4. User views impact dashboard
5. Admin reviews and approves recycler application
6. Bulk user submits large disposal request

**Test Environment**:
- Use staging environment with test data
- Mock external services (AI, maps, SMS) in E2E tests
- Reset database state between test runs
- Use test accounts with known credentials

### Performance Testing

**Tools**: Lighthouse (frontend), Artillery (backend load testing)

**Metrics**:
- Page load time < 3s on 3G
- Time to Interactive < 5s
- API response time < 500ms (p95)
- Database query time < 100ms (p95)
- AI classification time < 3s

**Load Testing Scenarios**:
- 100 concurrent users searching for recyclers
- 50 concurrent AI classification requests
- 1000 pickup requests per hour
- Admin dashboard with 10,000+ recyclers

### Accessibility Testing

**Tools**: axe-core, WAVE, manual screen reader testing

**Requirements**:
- Zero critical accessibility violations
- Keyboard navigation for all features
- Screen reader compatibility (NVDA, JAWS, VoiceOver)
- Color contrast compliance
- Focus management in modals and dynamic content

### Security Testing

**Focus Areas**:
- SQL injection prevention (parameterized queries)
- XSS prevention (input sanitization, CSP headers)
- CSRF protection (CSRF tokens)
- Authentication bypass attempts
- Authorization checks for all protected endpoints
- Rate limiting effectiveness
- Password strength requirements
- Secure session management

**Tools**: OWASP ZAP, npm audit, Snyk

## Deployment Architecture

### Production Environment

**Frontend Deployment**:
- Platform: Vercel
- CDN: Cloudflare
- Environment: Node.js 20
- Build: Static site generation for public pages, SSR for dynamic content
- Caching: CDN caching for static assets, ISR for semi-dynamic pages

**Backend Deployment**:
- Platform: AWS ECS (Elastic Container Service) with Fargate
- Load Balancer: Application Load Balancer with SSL termination
- Auto-scaling: Based on CPU and memory utilization
- Health Checks: /health endpoint for ALB monitoring

**Database**:
- Primary: AWS RDS PostgreSQL with Multi-AZ deployment
- Backup: Automated daily backups with 7-day retention
- Read Replicas: For analytics and reporting queries
- Connection Pooling: PgBouncer for connection management

**Cache**:
- Platform: AWS ElastiCache for Redis
- Use Cases: Session storage, rate limiting, API response caching
- TTL: Configurable per cache key (5min for recycler search, 1hr for impact stats)

**Storage**:
- Platform: AWS S3
- Buckets: Separate buckets for user uploads, recycler documents, compliance certificates
- Access: Pre-signed URLs for secure temporary access
- Lifecycle: Archive old documents to Glacier after 1 year

**Monitoring**:
- Application: Sentry for error tracking
- Infrastructure: AWS CloudWatch for metrics and logs
- Uptime: Pingdom for external monitoring
- Alerts: PagerDuty for critical incidents

### CI/CD Pipeline

**Source Control**: GitHub

**CI Pipeline** (GitHub Actions):
1. Lint code (ESLint, Prettier)
2. Run unit tests
3. Run property-based tests
4. Run integration tests
5. Build Docker images
6. Push to container registry
7. Deploy to staging

**CD Pipeline**:
- Staging: Auto-deploy on merge to `develop` branch
- Production: Manual approval required, deploy from `main` branch
- Rollback: One-click rollback to previous version
- Database Migrations: Run automatically with safety checks

### Security Measures

- SSL/TLS certificates from Let's Encrypt (auto-renewal)
- WAF (Web Application Firewall) rules on Cloudflare
- DDoS protection via Cloudflare
- Secrets management via AWS Secrets Manager
- Environment variables for configuration
- Regular security audits and penetration testing
- Dependency vulnerability scanning (Snyk, Dependabot)

### Scalability Considerations

- Horizontal scaling for backend services
- Database read replicas for read-heavy operations
- CDN for static asset delivery
- Async job processing for heavy operations (bulk imports, report generation)
- Message queue (AWS SQS) for decoupling services
- Microservices architecture for independent scaling

## Future Enhancements

### Phase 2 Features

1. **Mobile Applications**: Native iOS and Android apps with offline support
2. **IoT Integration**: Smart bins with weight sensors and QR code scanning
3. **Blockchain Tracking**: Immutable disposal records for compliance
4. **Carbon Credit Marketplace**: Trade carbon offsets generated from e-waste recycling
5. **B2B Portal**: Enterprise dashboard for corporate e-waste management
6. **Government Integration**: Direct integration with CPCB database for real-time verification
7. **Gamification**: Rewards and badges for consistent recycling behavior
8. **Community Features**: Local recycling groups and challenges
9. **Extended Producer Responsibility**: Manufacturer take-back programs
10. **Predictive Analytics**: AI-powered forecasting for e-waste generation

### Technical Debt & Improvements

- Migrate to GraphQL for more efficient data fetching
- Implement server-side rendering for all pages
- Add WebSocket support for real-time notifications
- Optimize database queries with materialized views
- Implement full-text search with Elasticsearch
- Add multi-region deployment for lower latency
- Implement feature flags for gradual rollouts
- Add A/B testing framework for UX optimization

## Appendix

### Distance Calculation Formula

Haversine formula for calculating distance between two coordinates:

```typescript
function calculateDistance(
  point1: { lat: number; lng: number },
  point2: { lat: number; lng: number }
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(point2.lat - point1.lat);
  const dLng = toRadians(point2.lng - point1.lng);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(point1.lat)) *
    Math.cos(toRadians(point2.lat)) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
```

### CO₂ Calculation Formula

Estimated CO₂ savings based on device type and weight:

```typescript
const CO2_SAVINGS_PER_KG: Record<DeviceType, number> = {
  mobile_phone: 55,      // kg CO₂ per kg of device
  laptop: 190,
  desktop: 200,
  monitor: 150,
  tv: 180,
  refrigerator: 300,
  washing_machine: 250,
  ac: 280,
  battery: 100,
  // ... other device types
};

function calculateCO2Saved(deviceType: DeviceType, weightKg: number): number {
  return CO2_SAVINGS_PER_KG[deviceType] * weightKg;
}
```

### Material Recovery Rates

Estimated material recovery percentages by device type:

```typescript
const MATERIAL_RECOVERY_RATES = {
  mobile_phone: {
    gold: 0.034,        // grams per kg
    silver: 0.35,
    copper: 130,
    aluminum: 25,
    plastic: 200,
  },
  laptop: {
    gold: 0.020,
    silver: 0.25,
    copper: 100,
    aluminum: 150,
    plastic: 250,
  },
  // ... other device types
};
```
