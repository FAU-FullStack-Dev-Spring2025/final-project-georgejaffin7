import { createClient } from '@supabase/supabase-js'
const URL = 'https://wxcmazcscqnidqhwapqx.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4Y21hemNzY3FuaWRxaHdhcHF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MTM3MDcsImV4cCI6MjA2MDQ4OTcwN30.HC403Jv_2sbCa9HJxnf7fRzi0sQGueaSGocQBJv1pik';
export const supabase = createClient(URL, API_KEY);