FROM mhart/alpine-node as builder



WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

FROM mhart/alpine-node
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "80", "."]


