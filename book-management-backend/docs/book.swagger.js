/**
 * @openapi
 * tags:
 *   - name: Books
 *     description: Book management
 */

/**
 * @openapi
 * /books:
 *   get:
 *     tags: [Books]
 *     summary: Get all books
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: Java programming
 *                       author:
 *                         type: string
 *                         example: Robert C. Martin
 *                       genre:
 *                         type: string
 *                         example: Programming
 *                       publishedYear:
 *                         type: integer
 *                         example: 2008
 *                       isDelete:
 *                         type: boolean
 *                         example: false
 *                       deletedAt:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                         example: null
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     total:
 *                       type: integer
 *                       example: 25
 *                     totalPages:
 *                       type: integer
 *                       example: 3
 */

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     tags: [Books]
 *     summary: Get a book by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book detail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: Java programming
 *                 author:
 *                   type: string
 *                   example: Robert C. Martin
 *                 genre:
 *                   type: string
 *                   example: Programming
 *                 publishedYear:
 *                   type: integer
 *                   example: 2008
 *                 isDelete:
 *                   type: boolean
 *                   example: false
 *                 deletedAt:
 *                   type: string
 *                   format: date-time
 *                   nullable: true
 *                   example: null
 *       400:
 *         description: Invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid book id
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book not found
 */

/**
 * @openapi
 * /books:
 *   post:
 *     tags: [Books]
 *     summary: Create a new book
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - genre
 *               - publishedYear
 *             properties:
 *               title:
 *                 type: string
 *                 example: How to calculate numbers
 *               author:
 *                 type: string
 *                 example: Robert C. Martin
 *               genre:
 *                 type: string
 *                 example: Mathematics
 *               publishedYear:
 *                 type: integer
 *                 example: 2008
 *     responses:
 *       201:
 *         description: Book created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: Java programming
 *                 author:
 *                   type: string
 *                   example: Robert C. Martin
 *                 genre:
 *                   type: string
 *                   example: Programming
 *                 publishedYear:
 *                   type: integer
 *                   example: 2008
 *                 isDelete:
 *                   type: boolean
 *                   example: false
 *                 deletedAt:
 *                   type: string
 *                   format: date-time
 *                   nullable: true
 *                   example: null
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Title is required
 */

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     tags: [Books]
 *     summary: Update a book by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: How to calculate numbers
 *               author:
 *                 type: string
 *                 example: Robert C. Martin
 *               genre:
 *                 type: string
 *                 example: Mathematics
 *               publishedYear:
 *                 type: integer
 *                 example: 2017
 *     responses:
 *       200:
 *         description: Book updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: Java programming
 *                 author:
 *                   type: string
 *                   example: Robert C. Martin
 *                 genre:
 *                   type: string
 *                   example: Programming
 *                 publishedYear:
 *                   type: integer
 *                   example: 2008
 *                 isDelete:
 *                   type: boolean
 *                   example: false
 *                 deletedAt:
 *                   type: string
 *                   format: date-time
 *                   nullable: true
 *                   example: null
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No valid fields to update
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book not found
 */

/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     tags: [Books]
 *     summary: Delete a book by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book deleted
 *                 bookId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid book id
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book not found
 */
