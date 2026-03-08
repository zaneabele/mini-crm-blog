## 1. `users` tabula (e-pasta lauks)

### 1.1. Pirms indeksa
Indekss jau bija izveidots, tāpēc vaicājums izmanto to.

```sql
EXPLAIN SELECT * FROM users WHERE email = 'anna@example.com';
```**Rezultāts:**
- `possible_keys`: email
- `key`: email
- `type`: const
- `rows`: 1```

## 2. `posts` tabula (autora lauks)

### 2.1. Pirms indeksa
```sql
EXPLAIN SELECT * FROM posts WHERE user_id = 1;
```**Rezultāts:**
- `possible_keys`: user_id
- `key`: NULL
- `type`: ALL
- `rows`: 2```

### 2.2. Pievienotais indekss
```sql
CREATE INDEX idx_posts_user_id ON posts(user_id);```

### 2.3. Pēc indeksa
```sql
EXPLAIN SELECT * FROM posts WHERE user_id = 1;
```**Rezultāts:**
- `possible_keys`: idx_posts_user_id
- `key`: idx_posts_user_id
- `type`: ref
- `rows`: 3```

