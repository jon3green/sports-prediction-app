import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Social Features Enhancement: Comments on shared parlays

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { comment } = body;

    if (!comment || comment.trim().length === 0) {
      return NextResponse.json({ error: 'Comment cannot be empty' }, { status: 400 });
    }

    // In production, save to database
    // For now, return success
    const mockComment = {
      id: Math.random().toString(36),
      userId: session.user.id,
      username: (session.user as any).username || session.user.name,
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    return NextResponse.json({ success: true, comment: mockComment }, { status: 201 });
  } catch (error) {
    console.error('Comment error:', error);
    return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // In production, fetch from database
    // For now, return empty array
    const comments = [];

    return NextResponse.json({ success: true, comments });
  } catch (error) {
    console.error('Get comments error:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

