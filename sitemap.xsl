<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title>Sitemap</title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <style type="text/css">
                    /* Import the pixel font */
                    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&amp;display=swap');
                    
                    :root {
                        --mc-green: #55FF55;
                        --mc-dark: #2D2D2D;
                        --mc-border: #4a4a4a;
                    }

                    body {
                        background-color: #000000;
                        color: #fefefe;
                        font-family: 'Segoe UI', Roboto, sans-serif;
                        margin: 0;
                        padding: 20px;
                        min-height: 100vh;
                        line-height: 1.8;
                        text-shadow: #000 1px 1px 1px;
                    }

                    /* Moving Star Background */
                    .star-bg {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        z-index: -1;
                        pointer-events: none;
                        background-image:
                            radial-gradient(2px 2px at 15% 25%, white, transparent),
                            radial-gradient(2px 2px at 70% 40%, white, transparent),
                            radial-gradient(2px 2px at 30% 75%, white, transparent),
                            radial-gradient(2px 2px at 85% 60%, white, transparent);
                        background-size: 350px 350px;
                        animation: moveStars 14s linear infinite;
                    }

                    @keyframes moveStars {
                        from { background-position: 0 0; }
                        to { background-position: 0 700px; }
                    }

                    h1 {
                        font-family: 'Press Start 2P', cursive;
                        color: var(--mc-green);
                        text-align: center;
                        margin-bottom: 30px;
                        font-size: 20px; /* Adjusted for pixel font size */
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        text-shadow: 3px 3px 0 #000;
                    }

                    /* Main Box - Matches .fsbox from your CSS */
                    .container {
                        max-width: 900px;
                        margin: 0 auto;
                        background-color: #171614;
                        border: 2px solid #252422;
                        padding: 20px;
                        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
                        border-radius: 1px;
                    }

                    .count-text {
                        text-align: center;
                        color: #aaa;
                        font-size: 10px;
                        margin-bottom: 20px;
                        font-family: 'Press Start 2P', cursive;
                        letter-spacing: 1px;
                    }

                    /* Table Styling */
                    table {
                        width: 100%;
                        border-collapse: separate;
                        border-spacing: 0 10px;
                    }

                    thead th {
                        text-align: left;
                        padding: 10px 15px;
                        color: var(--mc-green);
                        font-family: 'Press Start 2P', cursive;
                        font-size: 10px;
                        border-bottom: 2px solid var(--mc-border);
                        text-transform: uppercase;
                    }

                    /* Row Styling - Matches your button/list styles */
                    tbody tr {
                        background-color: #2f2f2f;
                        transition: transform 0.1s ease, background 0.1s ease;
                        /* The 3D button effect */
                        box-shadow: -3px 0px 0px var(--mc-border); 
                    }

                    tbody tr:hover {
                        background-color: #4a4a4a;
                        transform: translateY(-2px);
                        box-shadow: -3px 2px 1px var(--mc-green);
                    }

                    td {
                        padding: 12px 15px;
                        font-size: 13px;
                        color: #ffffff;
                    }

                    /* Link Styling */
                    a {
                        color: #ffffff;
                        text-decoration: none;
                        font-weight: bold;
                        transition: color 0.2s;
                        display: block;
                        width: 100%;
                    }

                    a:hover {
                        color: var(--mc-green);
                    }
                    
                    /* Helper for priority/freq formatting */
                    .meta-info {
                        color: #aaaaaa;
                        font-family: monospace;
                    }

                    /* Mobile Adjustments */
                    @media (max-width: 768px) {
                        h1 { font-size: 16px; }
                        td, th { font-size: 11px; padding: 10px; }
                        .priority-col, .changefreq-col { display: none; } /* Hide extra info on phones */
                        .container { width: 95%; padding: 10px; }
                    }
                </style>
            </head>
            <body>
                <div class="star-bg"></div>
                
                <h1>Sitemap Index</h1>
                
                <div class="container">
                    <div class="count-text">
                        URL COUNT: <xsl:value-of select="count(s:urlset/s:url)"/>
                    </div>
                
                    <table cellspacing="0">
                        <thead>
                            <tr>
                                <th>Location</th>
                                <th class="priority-col">Priority</th>
                                <th class="changefreq-col">Freq</th>
                                <th>Last Mod</th>
                            </tr>
                        </thead>
                        <tbody>
                            <xsl:for-each select="s/urlset/s:url">
                                <tr>
                                    <td>
                                        <a href="{s:loc}"><xsl:value-of select="s:loc"/></a>
                                    </td>
                                    <td class="priority-col meta-info">
                                        <xsl:value-of select="s:priority"/>
                                    </td>
                                    <td class="changefreq-col meta-info">
                                        <xsl:value-of select="s:changefreq"/>
                                    </td>
                                    <td class="meta-info">
                                        <xsl:value-of select="s:lastmod"/>
                                    </td>
                                </tr>
                            </xsl:for-each>
                        </tbody>
                    </table>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
