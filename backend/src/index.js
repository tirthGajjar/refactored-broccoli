const express = require('express')
const { PrismaClient } = require('@prisma/client')
var cors = require('cors')

const prisma = new PrismaClient()
const app = express()

app.use(cors())
app.use(express.json())


app.post(`/product/:slug/review`, async (req, res) => {
  const { rating, review } = req.body;
  const { slug } = req.params;
  const user = await prisma.user.findFirst()

  const result = await prisma.review.create({
    data: {
      rating: parseInt(rating),
      text: review,
      user: {
        connect: {
          id: user.id
        }
      },
      product: {
        connect: {
          slug,
        }
      }
    }
  })
  res.json(result)
})

app.get(`/product/:slug`, async (req, res) => {
  const { slug } = req.params;

  const product = await prisma.product.findUnique({
    where: {
      slug: slug
    },
    include: {
      reviews: {
        select: {
          rating: true,
          text: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }
    }
  })


  const avgRating = await prisma.review.aggregate({
    _avg: {
      rating: true
    },
    where: {
      productId: product.id
    }
  })

  res.json({
    ...product,
    avgRating: avgRating?._avg?.rating,
  })
})


app.listen(4000, () =>
  console.log("🚀 Server ready at: http://localhost:4000"))
