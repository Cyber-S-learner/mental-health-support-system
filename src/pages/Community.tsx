import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Heart, MessageCircle, Share2, Plus, Send } from 'lucide-react';
import { communityPosts } from '../data/mockData';

interface Post {
  id: number;
  username: string;
  avatar: string;
  message: string;
  likes: number;
  timestamp: string;
  comments: Array<{
    username: string;
    message: string;
  }>;
  isLiked?: boolean;
  showComments?: boolean;
}

export function Community() {
  const [posts, setPosts] = useState<Post[]>(communityPosts.map(post => ({ ...post, isLiked: false, showComments: false })));
  const [newPost, setNewPost] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);

  const handleLike = (postId: number) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const toggleComments = (postId: number) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, showComments: !post.showComments }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) return;
    
    const post: Post = {
      id: Date.now(),
      username: 'You',
      avatar: '😊',
      message: newPost,
      likes: 0,
      timestamp: 'Just now',
      comments: [],
      isLiked: false,
      showComments: false,
    };
    
    setPosts(prev => [post, ...prev]);
    setNewPost('');
    setShowNewPost(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Community Support</h1>
        <p className="text-muted-foreground">
          Connect with others on similar mental health journeys. Share your experiences and support each other.
        </p>
      </div>

      {/* Community Guidelines */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Community Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start space-x-2">
              <Heart className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Be Kind & Supportive</p>
                <p className="text-muted-foreground">Treat everyone with respect and empathy</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <MessageCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Share Responsibly</p>
                <p className="text-muted-foreground">Keep personal information private</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Share2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Encourage Others</p>
                <p className="text-muted-foreground">Lift each other up on this journey</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Post */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          {!showNewPost ? (
            <Button 
              onClick={() => setShowNewPost(true)}
              className="w-full"
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Share your thoughts or ask for support
            </Button>
          ) : (
            <div className="space-y-4">
              <Textarea
                placeholder="What's on your mind? Share your thoughts, progress, or ask for support..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px] resize-none"
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowNewPost(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreatePost} disabled={!newPost.trim()}>
                  <Send className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="pt-6">
              {/* Post Header */}
              <div className="flex items-start space-x-3 mb-4">
                <Avatar>
                  <AvatarFallback>{post.username[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium">{post.username}</p>
                    <Badge variant="secondary" className="text-xs">
                      Community Member
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                </div>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <p className="text-sm leading-relaxed">{post.message}</p>
              </div>

              {/* Post Actions */}
              <div className="flex items-center space-x-6 pt-2 border-t">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-1 text-sm transition-colors ${
                    post.isLiked 
                      ? 'text-red-500 hover:text-red-600' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                  <span>{post.likes}</span>
                </button>
                
                <button
                  onClick={() => toggleComments(post.id)}
                  className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments.length}</span>
                </button>
                
                <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>

              {/* Comments */}
              {post.showComments && post.comments.length > 0 && (
                <div className="mt-4 pt-4 border-t space-y-3">
                  {post.comments.map((comment, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {comment.username[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="bg-muted rounded-lg p-3">
                          <p className="font-medium text-sm">{comment.username}</p>
                          <p className="text-sm text-muted-foreground">{comment.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="outline">
          Load More Posts
        </Button>
      </div>
    </div>
  );
}