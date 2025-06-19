import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get('file') as File

        if (!file || typeof file === 'string') {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const timestamp = Date.now()
        const ext = file.name.split('.').pop()
        const fileName = `${timestamp}.${ext}`
        const uploadPath = path.join(process.cwd(), 'public', 'uploads', 'profiles', fileName)

        await fs.mkdir(path.dirname(uploadPath), { recursive: true })
        await fs.writeFile(uploadPath, buffer)

        return NextResponse.json({ url: `/uploads/profiles/${fileName}` }, { status: 200 })
    } catch (err) {
        console.error('Upload failed:', err)
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
}
