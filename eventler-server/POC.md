# Eventler POC - Self-Decision Focus

## Overview

This POC (Proof of Concept) focuses on implementing the **self-decision** event creation flow. The self-decision process allows individual users to create events, answer preference slides, and receive personalized recommendations without group collaboration.

## POC Scope

### ✅ Implemented Features

1. **User Registration & Authentication**
   - Register with email, username, password
   - Optional profile fields: city, age, occupation
   - JWT-based authentication
   - Profile management

2. **Event Types System**
   - Database-driven event types (Restaurant, Concert, Museum, etc.)
   - Extensible event type catalog
   - Event type associations with events

3. **Self-Decision Event Creation**
   - Create individual events (type: SINGLE)
   - Set participant count for planning
   - Configure budget, location, and date
   - Link to specific event types

4. **Slides & User Preferences**
   - Answer slide questions for specific events
   - Store weighted answers for recommendation engine
   - Track user preferences based on slide responses

5. **Recommendation System (Stub)**
   - Generate recommendations based on event and user data
   - Mocked recommendation feed
   - Ready for ML/algorithm integration

### 🚧 Not in POC Scope (Future)

- **Group Decision Flow**
  - Group-based event creation
  - Multi-user slide collaboration
  - Group consensus algorithms
  - Group invite and member management

## Data Model Highlights

### User Profile
Users can optionally provide demographic information during registration:
- **City**: User's location (helps with local recommendations)
- **Age**: Age for age-appropriate recommendations
- **Occupation**: Professional context for recommendations

All profile fields are **nullable** - users can skip them during registration.

### Events
Events support two modes:
- **SINGLE**: Self-decision (POC focus)
- **GROUP**: Group decision (future implementation)

Key fields:
- `type`: SINGLE or GROUP
- `eventTypeId`: Reference to event_types table
- `participantCount`: Number of participants
- `creatorId`: User who created the event
- `groupId`: null for self-decision events

### Event Types
Separate table for managing event categories:
- Restaurant
- Concert
- Outdoor Activity
- Museum
- Movie
- (Extensible for future types)

### Groups
Groups exist in the system but are **not owner-based**:
- No single owner
- All members have equal status
- Creator is just the first member

## Self-Decision Workflow

### 1. User Registration
```http
POST /auth/register
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "password123",
  "city": "Tel Aviv",        // optional
  "age": 28,                 // optional
  "occupation": "Developer"  // optional
}
```

### 2. Get Available Event Types
```http
GET /events/types/all
```

Response:
```json
[
  {
    "id": "uuid",
    "name": "Restaurant",
    "description": "Dining and food experiences"
  },
  ...
]
```

### 3. Create Self-Decision Event
```http
POST /events
Authorization: Bearer <token>
{
  "type": "SINGLE",
  "eventTypeId": "uuid",
  "participantCount": 2,
  "budget": 200,
  "location": "Tel Aviv",
  "date": "2024-01-15T19:00:00Z"
}
```

### 4. Answer Event Slides
```http
POST /slides/events/:eventId/answers
Authorization: Bearer <token>
{
  "question": "What type of cuisine do you prefer?",
  "answer": "Italian",
  "weight": 5
}
```

### 5. Generate Recommendations
```http
POST /events/recommendations/:eventId
Authorization: Bearer <token>
```

### 6. Get Recommendations
```http
GET /events/recommendations/:eventId
Authorization: Bearer <token>
```

Or get feed:
```http
GET /recommendations/feed
Authorization: Bearer <token>
```

## Database Schema (Self-Decision Relevant)

### users
- `id` (UUID)
- `email` (VARCHAR, unique)
- `username` (VARCHAR, unique)
- `password` (VARCHAR, hashed)
- `city` (VARCHAR, nullable)
- `age` (INTEGER, nullable)
- `occupation` (VARCHAR, nullable)
- `created_at`, `updated_at`

### event_types
- `id` (UUID)
- `name` (VARCHAR, unique)
- `description` (TEXT, nullable)
- `created_at`

### events
- `id` (UUID)
- `creator_id` (UUID → users)
- `group_id` (UUID → groups, nullable, **null for POC**)
- `event_type_id` (UUID → event_types)
- `type` (VARCHAR: SINGLE or GROUP)
- `status` (VARCHAR: OPEN, IN_PROGRESS, COMPLETED, CANCELLED)
- `participant_count` (INTEGER, nullable)
- `budget`, `location`, `date` (nullable)
- `created_at`

### slide_answers
- `id` (UUID)
- `event_id` (UUID → events)
- `user_id` (UUID → users)
- `question` (TEXT)
- `answer` (TEXT)
- `weight` (INTEGER)

### recommendations
- `id` (UUID)
- `event_id` (UUID → events)
- `title` (TEXT)
- `score` (DECIMAL)
- `rank` (INTEGER)
- `metadata` (JSONB)

## Key Design Decisions

1. **No Group Owner**: Groups are collaborative without hierarchy
2. **Optional User Details**: Privacy-first approach
3. **Separate Event Types Table**: Easy to extend and manage
4. **Participant Count**: Planning even for self-decision
5. **Weight in Slide Answers**: Importance scoring for ML
6. **Stub Recommendations**: Ready for algorithm integration

## Next Steps (Post-POC)

1. Implement actual recommendation algorithm
2. Add group decision workflow
3. Multi-user slide collaboration
4. Real-time updates for group events
5. Advanced preference learning
6. Integration with external APIs (venues, events, etc.)

## Testing the POC

1. Start PostgreSQL database
2. Run migrations: `npm run typeorm migration:run`
3. Seed sample data: Load `database/dml.sql`
4. Start server: `npm run start:dev`
5. Test endpoints with Postman/curl following the workflow above

## Environment Variables

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=eventler

# JWT
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRES_IN=7d
```

## Notes

- Focus on self-decision flow for POC
- Group features exist but are minimal
- Recommendation engine is mocked (returns sample data)
- User profile fields help personalize recommendations
- All endpoints require JWT authentication except register/login
