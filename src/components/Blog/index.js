import React, { useState, useEffect } from "react";
import ServiceProvidedDark from "../Faqs/ServiceProviderDark";
import { blogApi } from "../../apis/apisList/userApi";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Avatar,
  Chip,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await blogApi();
        const formattedPosts = response.map((post) => ({
          id: post.id,
          title: post.title.rendered,
          date: new Date(post.date).toLocaleDateString(),
          content: post.content.rendered,
          slug: post.slug,
          categories: post.categories,
          tags: post.tags,
          featuredImage: post._embedded?.["wp:featuredmedia"]?.[0],
          author: post._embedded?.author?.[0],
        }));
        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  // Generate a placeholder image URL with random colors
  const getPlaceholderImage = (id, title) => {
    const colors = ["4C9AFF", "00C7E6", "57D9A3", "FFC400", "FF5630", "6554C0"];
    const colorIndex = id % colors.length;
    return `https://placehold.co/600x400/${colors[colorIndex]}/FFFFFF?text=${title}`;
  };

  return (
    <>
      <ServiceProvidedDark />
      <Box
        sx={{
          padding: { xs: "30px 0", sm: "50px 0", md: "80px 0" },
          backgroundColor: "#f7f9fc",
        }}
      >
        <Box>
          <Container maxWidth="lg">
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "28px", sm: "32px", md: "36px" },
                fontWeight: "700",
                color: "#333",
                lineHeight: "1.3",
                marginBottom: "10px",
              }}
            >
              Support
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "16px", sm: "17px", md: "18px" },
                fontWeight: "500",
                color: "#4A4A4A",
                lineHeight: "1.6",
                marginBottom: "40px",
              }}
            >
              Stay informed with our latest health and wellness articles
            </Typography>
          </Container>
        </Box>

        <Box>
          <Container maxWidth="lg">
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "300px",
                }}
              >
                <CircularProgress color="primary" />
              </Box>
            ) : (
              <Grid container spacing={3}>
                {posts.map((post, index) => (
                  <Grid
                    item
                    key={post.id}
                    xs={12}
                    sm={6}
                    md={4}
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Card
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "12px",
                        overflow: "hidden",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                          "& .blog-image": {
                            transform: "scale(1.05)",
                          },
                        },
                        backgroundColor: "#fff",
                      }}
                    >
                      {/* Category tags */}

                      {/* <Box
                        sx={{
                          position: "absolute",
                          top: "12px",
                          left: "12px",
                          zIndex: 2,
                        }}
                      >
                        <Chip
                          label={getCategoryTag(post.categories)}
                          size="small"
                          sx={{
                            backgroundColor: "#fff",
                            color: "#333",
                            fontWeight: "600",
                            fontSize: "12px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          }}
                        />
                      </Box> */}

                      {/* Featured Image with zoom effect */}
                      <Box
                        sx={{
                          position: "relative",
                          height: "220px",
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          className="blog-image"
                          component="img"
                          src={
                            post.featuredImage?.source_url ||
                            getPlaceholderImage(post.id, post.title)
                          }
                          alt={post.featuredImage?.alt_text || post.title}
                          sx={{
                            width: "100%",
                            // height: "100%",
                            // objectFit: "fill",
                            transition: "transform 0.5s ease",
                          }}
                        />
                      </Box>

                      <CardContent
                        sx={{
                          padding: "20px",
                          flexGrow: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h2"
                            sx={{
                              fontSize: { xs: "18px", sm: "20px", md: "22px" },
                              fontWeight: "700",
                              color: "#333",
                              lineHeight: "1.4",
                              mb: 2,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              minHeight: "62px",
                            }}
                          >
                            {post.title}
                          </Typography>

                          {/* Post excerpt */}
                          <Box
                            className="blog-excerpt"
                            sx={{
                              fontSize: "15px",
                              color: "#666",
                              lineHeight: "1.6",
                              mb: 3,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              minHeight: "72px",
                              "& p": { margin: 0 },
                              "& img": { display: "none" },
                            }}
                            dangerouslySetInnerHTML={{
                              __html: post.content.split("</p>")[0] + "</p>",
                            }}
                          />
                        </Box>

                        <Box sx={{ mt: 2 }}>
                          {/* Author Info and Date */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              mb: 3,
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Avatar
                                src={
                                  post.author?.avatar_urls["96"] ||
                                  "/placeholder-avatar.png"
                                }
                                alt={post.author?.name || "Author"}
                                sx={{ width: 36, height: 36, mr: 1.5 }}
                              />
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  fontWeight: "600",
                                  fontSize: "14px",
                                  color: "#555",
                                }}
                              >
                                {post.author?.name || "Admin"}
                              </Typography>
                            </Box>
                            <Typography
                              variant="caption"
                              sx={{
                                color: "#888",
                                fontSize: "13px",
                              }}
                            >
                                {post.date||"N/A"}
                            </Typography>
                          </Box>

                          {/* Read More Button */}
                          <Link
                            to={`/support/${post.slug}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button
                              fullWidth
                              variant="contained"
                              sx={{
                                backgroundColor: "#FD6400",
                                color: "#FFF",
                                textTransform: "none",
                                fontWeight: "600",
                                fontSize: "15px",
                                padding: "10px 16px",
                                borderRadius: "8px",
                                "&:hover": {
                                  backgroundColor: "#e55a00",
                                },
                              }}
                            >
                              Read More
                            </Button>
                          </Link>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default Blog;
