import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://kreuvownaobtzamfcxyr.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyZXV2b3duYW9idHphbWZjeHlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0NzgzMTYsImV4cCI6MjEwNTA1NDMxNn0.Fu5ILgcBuRsDm9HNdSvImrYVkVVq4CrHZSyfDp9z7Xk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch all subjects sorted by order_index
 */
export async function getSubjects() {
  const { data, error } = await supabase
    .from("subjects")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) {
    console.error("Error loading subjects:", error);
    return [];
  }
  return data || [];
}

/**
 * Fetch all study resources with optional category or subject filter
 */
export async function getResources() {
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .order("upvotes", { ascending: false });

  if (error) {
    console.error("Error loading resources:", error);
    return [];
  }
  return data || [];
}

/**
 * Submit a new crowdsourced study resource
 */
export async function submitResource({
  subject_id,
  title,
  category,
  unit_number = null,
  year = null,
  url,
  file_type = "drive",
  contributed_by = "Anonymous Student",
}) {
  const { data, error } = await supabase
    .from("resources")
    .insert([
      {
        subject_id,
        title,
        category,
        unit_number: unit_number ? parseInt(unit_number, 10) : null,
        year: year || null,
        url,
        file_type,
        contributed_by: contributed_by.trim() || "Student Contributor",
        upvotes: 1, // First vote starts with contributor
      },
    ])
    .select();

  if (error) {
    console.error("Error submitting resource:", error);
    throw error;
  }
  return data?.[0];
}

/**
 * Increment upvote on a resource via atomic SQL function
 */
export async function upvoteResource(resourceId) {
  const { data, error } = await supabase.rpc("increment_upvote", {
    resource_id: resourceId,
  });

  if (error) {
    console.error("Error incrementing upvote:", error);
    throw error;
  }
  return data;
}

/**
 * Create a new subject
 */
export async function createSubject({
  code,
  name,
  short_name,
  branch = "ALL",
  accent = "#8B5CF6",
}) {
  const cleanCode = code.trim().toUpperCase();
  const slug = (short_name || name || cleanCode)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const id = `${slug}-${Date.now().toString().slice(-4)}`;

  const { data, error } = await supabase
    .from("subjects")
    .insert([
      {
        id,
        code: cleanCode,
        name: name.trim(),
        short_name: short_name.trim(),
        branch: branch || "ALL",
        accent: accent || "#8B5CF6",
        order_index: 99,
      },
    ])
    .select();

  if (error) {
    console.error("Error creating subject:", error);
    throw error;
  }
  return data?.[0];
}
