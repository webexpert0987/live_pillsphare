import React, { useState, useEffect } from "react";
import ServiceProvidedDark from "../Faqs/ServiceProviderDark";
import { blogApi } from "../../apis/apisList/userApi";
import { useLocation, useNavigate } from "react-router-dom";
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
  IconButton,
  InputBase,
  CircularProgress,
  Dialog,
  DialogContent,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"; //
import { useApp } from "../../Context/AppContext";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)"); // Detect mobile screen
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlgs] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  // const { setSearchBlogValue } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const searchBlogs = (search) => {
    const query = search.trim().toLowerCase().replace(/\s+/g, " ");
    // console.log("Normalized search query:", query);
    if (!query) {
      setPosts(allPosts);
      // console.log("No query entered, showing all posts:", allPosts);
      return;
    }
    const keywords = query.split(" ");
    const filteredBlogs = allPosts.filter((post) => {
      const title = post.title.toLowerCase();
      const content = post.content.toLowerCase();

      // Match only if all keywords are present in title or content
      return keywords.every(
        (word) => title.includes(word) || content.includes(word)
      );
    });

    if (filteredBlogs.length === 0) {
      console.log("No matching posts found");
    } else {
      console.log("Matching posts:", filteredBlogs);
    }
    setPosts(filteredBlogs);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await blogApi();
        // console.log("api, response ", response);
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
        setAllPosts(formattedPosts);
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
  const handleSearch = () => {
    searchBlogs(searchQuery);
    if (isMobile) closeSearch();
  };

  return (
    <>
      <ServiceProvidedDark />
      <Box
        sx={{
          padding: { xs: "30px 0", sm: "50px 0", md: "80px 0" },
          // backgroundColor: "#f7f9fc",
          backgroundColor: "#f7f9fc",
          // width:"75%",
          // height:"auto"
        }}
      >
        <Box>
          <Container maxWidth="lg">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              sx={{ marginBottom: "10px" }}
            >
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
              {/*  Search button */}
              <div>
                {isMobile ? (
                  // Mobile View: Search Icon + Popup
                  <>
                    <IconButton onClick={openSearch} color="primary">
                      <SearchIcon />
                    </IconButton>

                    <Dialog
                      open={isSearchOpen}
                      onClose={closeSearch}
                      maxWidth="sm"
                      fullWidth
                    >
                      <DialogContent>
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={1}
                          sx={{ padding: 1 }}
                        >
                          <InputBase
                            fullWidth
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => {
                              setSearchQuery(e.target.value);
                            }}
                            onKeyPress={(e) =>
                              e.key === "Enter" && handleSearch()
                            }
                            sx={{
                              border: "1px solid #ccc",
                              borderRadius: "8px",
                              padding: "8px 12px",
                              flex: 1,
                            }}
                          />
                          <IconButton onClick={handleSearch} color="primary">
                            <KeyboardReturnIcon />
                          </IconButton>
                          <IconButton onClick={closeSearch} color="secondary">
                            <CloseIcon />
                          </IconButton>
                        </Box>
                      </DialogContent>
                    </Dialog>
                  </>
                ) : (
                  // Desktop View: Normal Search Bar
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                      backgroundColor: "#F7F7F7",
                      border: "1px solid #F7F7F7",
                      borderRadius: "50px",
                      padding: "6px 10px 6px 20px",
                      maxWidth: "210px",
                      width: "100%",
                    }}
                  >
                    <InputBase
                      fullWidth
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        handleSearch();
                      }}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <IconButton color="primary" onClick={handleSearch}>
                      <SearchIcon sx={{ marginRight: "8px" }} />
                    </IconButton>
                  </Box>
                )}
              </div>
            </Box>
            {/* //////// */}
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
        {loading ? (
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
        ) : (
          <Box>
            <Container maxWidth="lg">
              {posts.length === 0 ? (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
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
                    No Blogs found with this keyword !
                  </Typography>
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
                                fontSize: {
                                  xs: "18px",
                                  sm: "20px",
                                  md: "22px",
                                },
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
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
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
                                {post.date || "N/A"}
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
        )}
      </Box>
    </>
  );
}

export default Blog;
