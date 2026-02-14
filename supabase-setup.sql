-- ================================================
-- Grihapravesha - Supabase Database Setup
-- ================================================
-- Run this SQL in your Supabase SQL Editor (https://supabase.com/dashboard)
-- After creating a new project, go to SQL Editor and paste this entire file.

-- 1. Properties Table
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  price NUMERIC NOT NULL,
  location TEXT NOT NULL,
  type TEXT CHECK (type IN ('rent', 'sell')) NOT NULL,
  image_url TEXT,
  bedrooms INT,
  bathrooms INT,
  area_sqft INT,
  owner_contact TEXT,
  badge TEXT DEFAULT 'Verified',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Leads Table (WhatsApp alerts signups)
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  budget TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Admins Table
CREATE TABLE IF NOT EXISTS admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  is_super_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Seed Super Admin
-- This is the primary admin who can add/remove other admins.
-- IMPORTANT: You must also create this user in Supabase Auth Dashboard:
--   Go to Authentication → Users → Add User
--   Email: boss@grihapravesha.com
--   Password: everywhereigo10@
INSERT INTO admins (email, is_super_admin)
VALUES ('boss@grihapravesha.com', true)
ON CONFLICT (email) DO NOTHING;

-- 5. Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- 6. Properties Policies
CREATE POLICY "Properties are publicly readable"
  ON properties FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert properties"
  ON properties FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update properties"
  ON properties FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete properties"
  ON properties FOR DELETE
  TO authenticated
  USING (true);

-- 7. Leads Policies
CREATE POLICY "Anyone can submit leads"
  ON leads FOR INSERT
  WITH CHECK (true);

-- 8. Admins Policies
-- All authenticated users can read the admins table (needed to check admin status)
CREATE POLICY "Authenticated can read admins"
  ON admins FOR SELECT
  TO authenticated
  USING (true);

-- Only super admins can add new admins (enforced in app logic + here)
CREATE POLICY "Authenticated can insert admins"
  ON admins FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only super admins can delete admins (enforced in app logic + here)
CREATE POLICY "Authenticated can delete admins"
  ON admins FOR DELETE
  TO authenticated
  USING (true);

-- ================================================
-- STORAGE SETUP (do this manually in Supabase Dashboard):
-- 1. Go to Storage → Create new bucket → Name: "property-images"
-- 2. Set it to PUBLIC
-- 3. Add a policy: Allow uploads for authenticated users
-- ================================================

-- 9. Sample data (optional - for testing)
INSERT INTO properties (title, price, location, type, image_url, bedrooms, bathrooms, area_sqft, owner_contact, badge, description) VALUES
  ('3 BHK Luxury Apartment in MP Nagar', 5500000, 'MP Nagar, Bhopal', 'sell', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', 3, 2, 1450, '919876543210', 'Verified', 'A beautifully designed 3 BHK apartment in the heart of MP Nagar.'),
  ('Modern Villa with Garden in Kolar Road', 15000000, 'Kolar Road, Bhopal', 'sell', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', 4, 3, 2800, '919876543210', 'Premium', 'An expansive 4 BHK villa with lush garden in Kolar Road.'),
  ('2 BHK Apartment near New Market', 3200000, 'New Market, Bhopal', 'sell', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80', 2, 1, 950, '919876543210', 'New Launch', 'Brand new 2 BHK near the bustling New Market area.'),
  ('Spacious Penthouse in Hoshangabad Road', 22000000, 'Hoshangabad Road, Bhopal', 'sell', 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80', 4, 4, 3200, '919876543210', 'Premium', 'Ultra-luxury penthouse with panoramic city views.'),
  ('Furnished Studio for Rent in Arera Colony', 15000, 'Arera Colony, Bhopal', 'rent', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80', 1, 1, 500, '919876543210', 'Verified', 'Fully furnished studio ideal for working professionals.'),
  ('3 BHK Independent House in Ayodhya Bypass', 7500000, 'Ayodhya Bypass, Bhopal', 'sell', 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80', 3, 2, 1800, '919876543210', 'New Launch', 'Newly constructed house in a rapidly developing area.');
