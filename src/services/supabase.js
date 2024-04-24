// here we are making a supabase client where we will initialize the supabase API and create a client so that we can querying our database.
// we get this code of how we can create and initialize our client from supabase API page, from introduction.
// and we get the supabaseUrl and anon key from project settings, then API.

import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://jzaznxqivkamungjldfs.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6YXpueHFpdmthbXVuZ2psZGZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMxNzM5NzksImV4cCI6MjAxODc0OTk3OX0.WL18AIZ47lVl0_3uekeY3OMVXosaaMzAV6nlj9WR4bg";
// when we expose supabase key on the client, some malicious users might be able to hack our database, and the answer would be true if we didn't activate row level security(RLS). But since we did anyone who has this key can only do whatever we allowed in the row level security policies. and the only thing we allowed is to just read data from our tables. so it's completely safe to share this key here to the client.
const supabase = createClient(supabaseUrl, supabaseKey); // the client needs our supabase data API, because he will be the one that deals with this API, and we will only query what we want from this client directly.

export default supabase; // this supabase client has all supabase data we have created.
// so now we can import this supabase client and start querying.

// [1] set up our project tables, RLS, and Bucket storage in supabase website.
// [2] install supabase javascript libaray on our project, npm install @supabase/supabase-js
// [3] we create supabase clinet here. [supabase.js file]
// [4] we create functions that read and mutate data from the supabse client, to each table domain/slice of supabase. [apiCabins, apiBooking, apiSettings]
// [5] we give React Query the responsibility of querying and dealing with these functions. [useCabins, useCreateCabins, useDelteCabins, useSettings, useUpdateSettings, ...]
