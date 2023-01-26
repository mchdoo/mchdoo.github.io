import { supabase } from "$lib/supabaseClient";

export async function load({}) {

    const {data: gradient} = await supabase.storage.from('assets').getPublicUrl('gradient')

    return {
        gradient
    }
}