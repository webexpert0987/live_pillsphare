import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { blogApi } from "../../apis/apisList/userApi";
// import { useApp } from "../../Context/AppContext";
import ServiceProvidedDark from "../Faqs/ServiceProviderDark";
import {
  Avatar,
  Box,
  Container,
  Divider,
  // Grid,
  Typography,
  CircularProgress,
} from "@mui/material";

function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await blogApi();
        const formattedPosts = response.map((post) => ({
          id: post.id,
          title: post.title.rendered,
          content: post.content.rendered,
          date: post.date,
          excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, ""),
          slug: post.slug,
          categories: post.categories,
          tags: post.tags,
          featuredImage: post._embedded?.["wp:featuredmedia"]?.[0],
          author: post._embedded?.author?.[0],
          comments: post._embedded?.replies?.[0] || [],
        }));
        const postDetail = formattedPosts.find((post) => post.slug === slug);
        if (postDetail) {
          setPost(postDetail);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [slug]);

  if (loading) {
    return (
      <Box
        height="40vh"
        minHeight="300px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        boxShadow="none"
        border="none"
        outline="none"
        sx={{ flexDirection: "column" }}
      >
        <CircularProgress color="primary" />
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!post) {
    return <Typography>Post not found</Typography>;
  }

  return (
    <>
      <ServiceProvidedDark />
      <Box
        sx={{
          padding: { xs: "30px 0", sm: "50px 0", md: "80px 0" },
        }}
      >
        <Container>
          {/* Featured Image */}
          {post.featuredImage && (
            <Box
              sx={{
                width: "100%",
                height: { xs: "200px", sm: "300px", md: "400px" },
                marginBottom: "30px",
                overflow: "hidden",
                borderRadius: "12px",
              }}
            >
              <img
                src={post.featuredImage.source_url}
                alt={post.featuredImage.alt_text || post.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          )}

          {/* Title & Meta */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "26px", sm: "32px", md: "36px" },
              fontWeight: "700",
              color: "#333",
              lineHeight: "1.3",
              marginBottom: "20px",
            }}
          >
            {post.title}
          </Typography>

          {/* Author Info */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            {post.author && (
              <>
                <Avatar
                  src={post.author.avatar_urls["96"]}
                  alt={post.author.name}
                  sx={{ width: 48, height: 48, mr: 2 }}
                />
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "500", color: "#104239" }}
                  >
                    {post.author.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#666" }}>
                    {new Date(post.date).toLocaleDateString("en-UK", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </Typography>
                </Box>
              </>
            )}
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Content */}
          <Box
            sx={{
              "& img": {
                maxWidth: "100%",
                height: "auto",
                marginBottom: "20px",
                borderRadius: "8px",
              },
              "& p": {
                fontSize: { xs: "15px", sm: "16px", md: "17px" },
                fontWeight: "400",
                color: "#4A4A4A",
                lineHeight: "1.8",
                marginBottom: "20px",
              },
              "& h2, & h3, & h4": {
                color: "#333",
                fontWeight: "700",
                marginTop: "30px",
                marginBottom: "15px",
              },
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Comments Section */}
          {post.comments?.length > 0 && (
            <Box sx={{ mt: 6 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "22px", sm: "26px", md: "28px" },
                  fontWeight: "700",
                  color: "#333",
                  mb: 3,
                }}
              >
                Comments
              </Typography>
              {post.comments.map((comment) => (
                <Box
                  key={comment.id}
                  sx={{
                    mb: 3,
                    p: 3,
                    backgroundColor: "#F6EFDF",
                    borderRadius: "8px",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      src={comment.author_avatar_urls["96"]}
                      sx={{ width: 40, height: 40, mr: 2 }}
                    />
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "500" }}
                      >
                        {comment.author_name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#666" }}>
                        {new Date(comment.date).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: "14px", sm: "15px", md: "16px" },
                      color: "#4A4A4A",
                      lineHeight: "1.6",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: comment.content.rendered,
                    }}
                  />
                </Box>
              ))}
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
}

export default BlogDetail;
