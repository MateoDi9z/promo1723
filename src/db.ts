import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rftwsthxmkzzdxztlxyy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmdHdzdGh4bWt6emR4enRseHl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ4NTQwMjQsImV4cCI6MjAwMDQzMDAyNH0.yL-EY22hoPf1t9RpdxzfvNDWTnzaykxTlM02_prfre0'
const supabase = createClient(supabaseUrl, supabaseKey)

const dev = false

export async function postView() {
    if (dev) return
    await supabase.from("views").insert([{}])
}

export async function postPromo() {
    if (dev) return

    const url = "https://www.instagram.com/promorocca23"
    const promo = "1723"

    const { data, error } = await supabase.from("estudiantes").select("*").eq("estudiante", promo)

    await supabase.from("estudiantes").update({
        clicks: data ? data[0].clicks + 1 : 0
    }).eq("estudiante", promo)

    window.open(url)
}

export async function postClick(name: string, ig: string) {
    if (dev) return

    const { data, error } = await supabase.from("estudiantes").select("*").eq("estudiante", name)
    
    if (error) console.log(error)

    if (!data || !data[0]) {
        await supabase.from("estudiantes").insert([
            {
                estudiante: name
            }
        ])
        window.open(ig)
        return
    }
    
    await supabase.from("estudiantes").update({
        clicks: data ? data[0].clicks + 1 : 0
    }).eq("estudiante", name)

    window.open(ig)
}