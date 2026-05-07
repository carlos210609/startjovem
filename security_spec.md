# Security Specification for Start Jovem

## Data Invariants
1. A user can only edit their own profile.
2. A post must have a valid author ID matching the authenticated user.
3. Likes count can be incremented by anyone but must be a number.
4. Comments must be linked to a post and have a valid author.

## The Dirty Dozen Payloads
1. **User Spoofing**: Attempt to create a user profile with a different UID.
2. **Post Hijacking**: Attempt to update a post created by another user.
3. **Ghost Post**: Create a post without a `content` field.
4. **Malicious Content**: Inject a 1MB string into a post `content`.
5. **Like Inflation**: Manually set `likesCount` to 999999.
6. **Orphaned Comment**: Create a comment for a post ID that doesn't exist.
7. **Identity Theft**: Update another user's `email`.
8. **Shadow Field**: Add a `role: 'admin'` field to a user profile.
9. **Timestamp Manipulation**: Set `createdAt` to a future date in the past.
10. **ID Poisoning**: Use a 2KB junk string as a `postId`.
11. **PII Leak**: Read all user emails without being owner.
12. **Recursive Delete**: Attempt to delete all posts in the collection.

## Test Runner (Conceptual)
All "Dirty Dozen" payloads will return `PERMISSION_DENIED` based on the following rules.
