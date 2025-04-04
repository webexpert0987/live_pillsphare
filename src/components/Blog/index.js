import React, { useState, useEffect } from "react";
import ServiceProvidedDark from "../Faqs/ServiceProviderDark";
import { blogApi } from "../../apis/apisList/userApi";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid2,
  Typography,
  Avatar,
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

  return (
    <>
      <ServiceProvidedDark />
      <Box
        sx={{
          padding: { xs: "30px 0", sm: "50px 0", md: "80px 0" },
        }}
      >
        <Box>
          <Container>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "22px", sm: "30px", md: "32px" },
                fontWeight: "700",
                color: "#333",
                lineHeight: "1.3",
                marginBottom: "20px",
              }}
            >
              Blog
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "15px", sm: "16px", md: "17px" },
                fontWeight: "500",
                color: "#4A4A4A",
                lineHeight: "1.6",
                marginBottom: "25px",
              }}
            >
              Stay informed with our latest health and wellness articles
            </Typography>
          </Container>
        </Box>

        <Box>
          <Container sx={{ mt: 4 }}>
            <Grid2
              container
              spacing={3}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              {loading ? (
                <Typography>Loading posts...</Typography>
              ) : (
                posts.map((post) => (
                  <Grid2
                    key={post.id}
                    xs={12}
                    sm={6}
                    md={4}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "stretch", // Ensure cards stretch to the same height
                    }}
                  >
                    <Card
                      sx={{
                        borderRadius: "10px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        border: "1px solid #EEE",
                        height: "100%", // Ensure cards take full height of the Grid item
                        maxWidth: "350px", // Set a consistent max width for all cards
                        minWidth: "350px", // Set a consistent max width for all cards
                        width: "100%", // Ensure cards take full width of the Grid item
                        transition: "transform 0.2s",
                        "&:hover": {
                          transform: "translateY(-5px)",
                        },
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* Featured Image */}
                      {post.featuredImage && (
                        <Box
                          sx={{
                            width: "100%",
                            height: "200px", // Fixed height for images
                            overflow: "hidden",
                            borderRadius: "10px 10px 0 0",
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

                      <CardContent
                        sx={{
                          padding: {
                            xs: "15px 15px 0 15px",
                            sm: "20px 20px 10px 20px",
                            md: "30px 30px 15px 30px",
                          },
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          flexGrow: 1,
                          overflow: "hidden", // Prevent content overflow
                        }}
                      >
                        <Box>
                          {/* Author Info */}
                          {post.author && (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                              }}
                            >
                              <Avatar
                                src={post.author.avatar_urls["96"]}
                                alt={post.author.name}
                                sx={{ width: 40, height: 40, mr: 2 }}
                              />
                              <Box>
                                <Typography
                                  variant="subtitle2"
                                  sx={{
                                    fontWeight: "500",
                                    color: "#104239",
                                    fontSize: "14px",
                                  }}
                                >
                                  {post.author.name}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: "#666",
                                    fontSize: "12px",
                                  }}
                                >
                                  {post.date}
                                </Typography>
                              </Box>
                            </Box>
                          )}

                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: { xs: "20px", sm: "22px", md: "24px" },
                              fontWeight: "700",
                              marginBottom: "15px",
                              color: "#333",
                            }}
                          >
                            {post.title}
                          </Typography>
                          <Box
                            className="blog-content"
                            sx={{
                              fontSize: { xs: "15px", sm: "16px", md: "16px" },
                              fontWeight: "500",
                              marginBottom: "15px",
                              lineHeight: "1.6",
                              color: "#666",
                              height: "120px", // Fixed height for content
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: "5",
                              WebkitBoxOrient: "vertical",
                              "& p": {
                                margin: "0 0 10px 0",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "5",
                                WebkitBoxOrient: "vertical",
                              },
                              "& img": { display: "none" }, // Hide images in preview
                            }}
                            dangerouslySetInnerHTML={{
                              __html: post.content.split("</p>")[0] + "</p>", // Only show first paragraph
                            }}
                          />
                        </Box>
                        <Box>
                          <Link to={`/support/${post.slug}`}>
                            <Button
                              variant="outlined"
                              sx={{
                                fontSize: "14px",
                                fontWeight: "600",
                                lineHeight: "1.4",
                                backgroundColor: "#FD6400",
                                color: "#FFF",
                                borderRadius: "50px",
                                border: "none",
                                textTransform: "inherit",
                                padding: "12px 20px",
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
                  </Grid2>
                ))
              )}
            </Grid2>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default Blog;
