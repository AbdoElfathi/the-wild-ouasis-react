import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://eozkelofukfuaanlfbdb.supabase.co";
export const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvemtlbG9mdWtmdWFhbmxmYmRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgwMjU3MTYsImV4cCI6MjAyMzYwMTcxNn0.AWYTtSic8JgU7P5pBY8apT9EXFyPqfTr8J9uQN1_J2g";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
