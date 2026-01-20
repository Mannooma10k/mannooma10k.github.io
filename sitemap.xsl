<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9" exclude-result-prefixes="s">
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title>Sitemap</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <style type="text/css">
                    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&amp;display=swap');
                    
                    :root {
                        --mc-green: #55FF55;
                        --mc-dark: #171614;
                        --mc-border: #4a4a4a;
                    }

                    body {
                        background-color: #000000;
                        color: #fefefe;
                        font-family: 'Segoe UI', Roboto, sans-serif;
                        margin: 0;
                        padding: 20px;
                        min-height: 100vh;
                        text-shadow: #000 2px 2px 0px;
                    }

                    .star-bg {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        z-index: -1;
                        background-image:
                            radial-gradient(2px 2px at 15% 25%, white, transparent),
                            radial-gradient(2px 2px at 70% 40%, white, transparent),
                            radial-gradient(2px 2px at 30% 75%, white, transparent),
                            radial-gradient(2px 2px at 85% 60%, white, transparent);
                        background-size: 350px 350px;
                        animation: moveStars 20s linear infinite;
                    }

                    @keyframes moveStars {
                        from { background-position: 0 0; }
                        to { background-position: 0 700px; }
                    }

                    .container {
                        max-width: 1000px;
                        margin: 40px auto;
                        background-color: var(--mc-dark);
                        border: 4px solid #3c3b39;
                        padding: 30px;
                        box-shadow: 10px 10px 0px rgba(0, 0, 0, 0.5);
                    }

                    h1 {
                        font-family: 'Press Start 2P', cursive;
                        color: var(--mc-green);
                        text-align: center;
                        font-size: 22px;
                        margin-bottom: 10px;
                        text-transform: uppercase;
                    }

                    .count-text {
                        text-align: center;
                        color: #777;
                        font-family: 'Press Start 2P', cursive;
                        font-size: 9px;
                        margin-bottom: 30px;
                    }

                    table {
                        width: 100%;
                        border-collapse: separate;
                        border-spacing: 0 8px;
                    }

                    th {
                        font-family: 'Press Start 2P', cursive;
                        font-size: 10px;
                        color: #aaaaaa;
                        text-align: left;
                        padding: 10px;
                        border-bottom: 2px solid #3c3b39;
                    }

                    tr {
                        background-color: #2f2f2f;
                        transition: all 0.2s ease;
                    }

                    tr:hover {
                        background-color: #3d3d3d;
                        transform: scale(1.01);
                    }

                    td {
                        padding: 15px;
                        border-left: 4px solid transparent;
                    }

                    tr:hover td {
                        border-left: 4px solid var(--mc-green);
                    }

                    a {
                        color: #fff;
                        text-decoration: none;
                        word-break: break-all;
                    }

                    .meta {
                        font-family: monospace;
                        color: var(--mc-green);
                        font-weight: bold;
                    }

                    @media (max-width: 600px) {
                        .hide-mobile { display: none; }
                        .container { padding: 15px; margin: 10px; }
                        h1 { font-size: 14px; }
                    }
                </style>
            </head>
            <body>
                <div class="star-bg"></div>
                <div class="container">
                    <h1>Sitemap Index</h1>
                    <div class="count-text">
                        TOTAL LINKS: <xsl:value-of select="count(s:urlset/s:url)"/>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Location</th>
                                <th class="hide-mobile">Priority</th>
                                <th class="hide-mobile">Change</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <xsl:for-each select="s:urlset/s:url">
                                <tr>
                                    <td>
                                        <a href="{s:loc}"><xsl:value-of select="s:loc"/></a>
                                    </td>
                                    <td class="hide-mobile meta">
                                        <xsl:value-of select="s:priority"/>
                                    </td>
                                    <td class="hide-mobile" style="color:#aaa">
                                        <xsl:value-of select="s:changefreq"/>
                                    </td>
                                    <td style="font-size: 11px; color: #888;">
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
