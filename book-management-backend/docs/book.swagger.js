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
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: Java programming
 *                   author:
 *                     type: string
 *                     example: Robert C. Martin
 *                   genre:
 *                     type: string
 *                     example: Programming
 *                   publishedYear:
 *                     type: integer
 *                     example: 2008
 *                   isDelete:
 *                     type: boolean
 *                     example: false
 *                   deletedAt:
 *                     type: string
 *                     format: date-time
 *                     nullable: true
 *                     example: null
 */

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     tags: [Books]
 *     summary: Get a book by ID
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
